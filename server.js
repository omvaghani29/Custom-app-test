import { createServer } from "http";
import { fileURLToPath } from "url";
import { dirname, join } from "path";

const __dirname = dirname(fileURLToPath(import.meta.url));
const buildPath = join(__dirname, "build", "server", "index.js");

console.log("Loading build...");

const buildModule = await import(buildPath);

console.log("Build module keys:", Object.keys(buildModule));
console.log("Entry:", buildModule.entry);
console.log("Entry type:", typeof buildModule.entry);

// Check what entry.module actually is
if (buildModule.entry) {
  console.log("Entry.module type:", typeof buildModule.entry.module);
  console.log("Entry.module:", buildModule.entry.module);
}

let handler;

// The entry.module is already the imported module, not a path
if (buildModule.entry?.module) {
  const entryModule = buildModule.entry.module;
  
  console.log("Entry module keys:", Object.keys(entryModule));
  console.log("Entry module default type:", typeof entryModule.default);
  
  if (typeof entryModule.default === 'function') {
    // The entry module exports a handler
    handler = async (request) => {
      return await entryModule.default(request, buildModule);
    };
  } else {
    throw new Error("Entry module doesn't export a default function handler");
  }
} else {
  throw new Error("No entry module found in build");
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