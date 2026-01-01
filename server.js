import * as ReactRouterNode from "@react-router/node";
import { createServer } from "http";
import { fileURLToPath } from "url";
import { dirname, join } from "path";

const __dirname = dirname(fileURLToPath(import.meta.url));
const buildPath = join(__dirname, "build", "server", "index.js");

console.log("Checking @react-router/node exports:", Object.keys(ReactRouterNode));

// Import the build configuration
const build = await import(buildPath);

console.log("Build exports:", Object.keys(build));

// Try different possible exports
const createHandler = 
  ReactRouterNode.createRequestHandler || 
  ReactRouterNode.default?.createRequestHandler ||
  ReactRouterNode.default;

console.log("Handler creator type:", typeof createHandler);

if (typeof createHandler !== 'function') {
  console.error("Available exports from @react-router/node:", Object.keys(ReactRouterNode));
  throw new Error("Could not find handler creator function");
}

const handler = createHandler(build);

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
