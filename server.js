import { createServer } from "http";
import { fileURLToPath } from "url";
import { dirname, join } from "path";

const __dirname = dirname(fileURLToPath(import.meta.url));
const buildPath = join(__dirname, "build", "server", "index.js");

console.log("Loading build...");

const build = await import(buildPath);

console.log("Build loaded successfully");

// Get the entry module handler
const entryModule = build.entry?.module;

if (!entryModule || typeof entryModule.default !== 'function') {
  throw new Error("Entry module doesn't export a default handler");
}

const PORT = parseInt(process.env.PORT || "3000", 10);
const HOST = process.env.HOST || "0.0.0.0";

const server = createServer(async (req, res) => {
  try {
    const request = new Request(`http://${req.headers.host}${req.url}`, {
      method: req.method,
      headers: req.headers,
      body: ["GET", "HEAD"].includes(req.method) ? undefined : req,
    });

    // Create the context that React Router expects
    const context = {
      manifest: {
        routes: build.routes,
        entry: build.entry,
        url: build.publicPath,
      },
      serverHandoffString: null,
      serverHandoffStream: null,
      criticalCss: null,
      serverFunctions: {},
    };

    // Call the handler with request and context
    const response = await entryModule.default(request, context);

    res.writeHead(response.status, Object.fromEntries(response.headers));

    if (response.body) {
      const buffer = await response.arrayBuffer();
      res.end(Buffer.from(buffer));
    } else {
      res.end();
    }
  } catch (error) {
    console.error("Request error:", error);
    res.writeHead(500, { "Content-Type": "text/plain" });
    res.end("Internal Server Error");
  }
});

server.listen(PORT, HOST, () => {
  console.log(`✓ Server running at http://${HOST}:${PORT}`);
});

process.on("unhandledRejection", (reason) => {
  console.error("Unhandled Rejection:", reason);
  process.exit(1);
});