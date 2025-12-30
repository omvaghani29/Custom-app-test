import { createServer } from "http";
import { fileURLToPath } from "url";
import { dirname, join } from "path";

const __dirname = dirname(fileURLToPath(import.meta.url));
const buildPath = join(__dirname, "build", "server", "index.js");

// Import the server build
let handler;
try {
  const build = await import(buildPath);
  
  // React Router typically exports a default request handler
  // Try different possible export patterns
  handler = build.default?.fetch || 
            build.default || 
            build.fetch || 
            build.handler ||
            build;
  
  if (typeof handler !== 'function') {
    throw new Error('No valid handler function found in build');
  }
} catch (error) {
  console.error("Failed to import build file:", error);
  process.exit(1);
}

const PORT = parseInt(process.env.PORT || "3000", 10);
const HOST = process.env.HOST || "0.0.0.0";

const server = createServer(async (req, res) => {
  try {
    // Create a Web API Request object
    const request = new Request(`http://${req.headers.host}${req.url}`, {
      method: req.method,
      headers: req.headers,
      body: req.method !== "GET" && req.method !== "HEAD" ? req : undefined,
    });

    const response = await handler(request);

    res.writeHead(response.status, Object.fromEntries(response.headers));
    
    // Use arrayBuffer for binary data support
    const body = await response.arrayBuffer();
    res.end(Buffer.from(body));
  } catch (error) {
    console.error("Request error:", error);
    res.writeHead(500);
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