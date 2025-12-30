import { createServer } from "http";
import { fileURLToPath } from "url";
import { dirname, join } from "path";


const __dirname = dirname(fileURLToPath(import.meta.url));
const buildPath = join(__dirname, "build", "server", "index.js");


let handler;
try {
  const imported = await import(buildPath);
  
  console.log("=== DEBUG INFO ===");
  console.log("Imported keys:", Object.keys(imported));
  console.log("Imported default:", typeof imported.default);
  console.log("Imported fetch:", typeof imported.fetch);
  
  // React Router typically exports a 'createRequestHandler' function or has a default export
  // Try to get the handler in order of likelihood
  handler = imported.default || 
            imported.fetch || 
            (typeof imported === 'function' ? imported : null);
  
  // If handler is still not a function, check if it's an object with a fetch method
  if (!handler && typeof imported === 'object' && typeof imported.fetch === 'function') {
    handler = imported.fetch;
  }
  
  console.log("Final handler type:", typeof handler);
  
  if (typeof handler !== 'function') {
    throw new Error(
      `No valid handler function found. Exported: ${Object.keys(imported).join(', ')}`
    );
  }
} catch (error) {
  console.error("Failed to import build file:", error);
  process.exit(1);
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
