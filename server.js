import { createServer } from "http";
import { fileURLToPath } from "url";
import { dirname, join } from "path";

const __dirname = dirname(fileURLToPath(import.meta.url));
const build = await import(join(__dirname, "build/server/index.js"));

const PORT = Number(process.env.PORT) || 3000;
const HOST = "0.0.0.0";

if (typeof build.handleNodeRequest !== "function") {
  throw new Error("handleNodeRequest is not exported from build");
}

const server = createServer((req, res) => {
  try {
    build.handleNodeRequest(req, res, {
      mode: process.env.NODE_ENV || "production",
    });
  } catch (error) {
    console.error("Server error:", error);
    res.statusCode = 500;
    res.end("Internal Server Error");
  }
});

server.listen(PORT, HOST, () => {
  console.log(`✓ Server running on http://${HOST}:${PORT}`);
});
