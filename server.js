import { createServer } from "http";
import { fileURLToPath } from "url";
import { dirname, join } from "path";

const __dirname = dirname(fileURLToPath(import.meta.url));
const buildPath = join(__dirname, "build", "server", "index.js");

console.log("Loading build...");

// Import the build - it should export a default handler
const buildModule = await import(buildPath);

console.log("Build module keys:", Object.keys(buildModule));
console.log("Build module default type:", typeof buildModule.default);

// For React Router v7, check if there's a handler in the module
let handler;

// Try to find the handler
if (buildModule.default && typeof buildModule.default === 'function') {
  handler = buildModule.default;
} else if (buildModule.default && buildModule.default.fetch) {
  handler = buildModule.default.fetch;
} else {
  // If no direct handler, we need to create one manually
  const { entry, routes } = buildModule;
  
  if (!entry || !routes) {
    throw new Error("Build doesn't contain entry or routes");
  }

  // Create a simple handler
  handler = async (request) => {
    try {
      // Import the entry module which should handle requests
      const entryModule = await import(join(__dirname, "build", "server", entry.module));
      
      if (entryModule.default && typeof entryModule.default === 'function') {
        return await entryModule.default(request, buildModule);
      }
      
      throw new Error("Entry module doesn't export a default handler");
    } catch (error) {
      console.error("Handler error:", error);
      return new Response("Internal Server Error", { status: 500 });
    }
  };
}

console.log("Handler type:", typeof handler);

const PORT = parseInt(process.env.PORT || "3000", 10);
const HOST = process.env.HOST || "0.0.0.0";

const server = createServer(async (req, res) => {
  try {
    const request = new Request(`http://${req.headers.host}${req.url}`, {
      method: req.method,
      headers: req.headers,
      body: ["GET", "HEAD"].includes(req.method) ? undefined : req,
    });

    const response = await handler(request);

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