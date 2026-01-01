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

// Check the handler signature
console.log("Handler function:", entryModule.default.toString().substring(0, 200));

const PORT = parseInt(process.env.PORT || "3000", 10);
const HOST = process.env.HOST || "0.0.0.0";

const server = createServer(async (req, res) => {
  try {
    const request = new Request(`http://${req.headers.host}${req.url}`, {
      method: req.method,
      headers: req.headers,
      body: ["GET", "HEAD"].includes(req.method) ? undefined : req,
    });

    // Try calling with just the request first
    let response;
    
    try {
      // Option 1: Call with request and build
      response = await entryModule.default(request, {
        build: build,
        mode: process.env.NODE_ENV || "production",
        getLoadContext: () => ({
          manifest: {
            routes: build.routes,
            entry: build.entry,
            url: build.publicPath || "/",
            assets: build.assets,
          },
        }),
      });
    } catch (err) {
      console.log("First attempt failed, trying alternative...");
      
      // Option 2: Maybe it needs different parameters
      response = await entryModule.default(request, {
        manifest: {
          routes: build.routes,
          entry: build.entry,
          url: build.publicPath || "/",
          assets: build.assets,
        },
        build: build,
      });
    }

    res.writeHead(response.status, Object.fromEntries(response.headers));

    if (response.body) {
      const buffer = await response.arrayBuffer();
      res.end(Buffer.from(buffer));
    } else {
      res.end();
    }
  } catch (error) {
    console.error("Request error:", error);
    console.error("Error stack:", error.stack);
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