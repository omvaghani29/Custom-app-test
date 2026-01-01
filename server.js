import { createServer } from "http";
import { fileURLToPath } from "url";
import { dirname, join } from "path";
// 1. Import the createRequestHandler from the specific adapter
import { createRequestHandler } from "@react-router/node"; 

const __dirname = dirname(fileURLToPath(import.meta.url));
const build = await import(join(__dirname, "build/server/index.js"));

const PORT = Number(process.env.PORT) || 3000;
const HOST = "0.0.0.0";

// 2. Create the handler using the build object
const handler = createRequestHandler(build, process.env.NODE_ENV || "production");

const server = createServer((req, res) => {
  // 3. Use the handler instead of build.handleNodeRequest
  handler(req, res).catch((error) => {
    console.error("Server error:", error);
    res.statusCode = 500;
    res.end("Internal Server Error");
  });
});

server.listen(PORT, HOST, () => {
  console.log(`✓ Server running on http://${HOST}:${PORT}`);
});