import { createServer } from "http";
import { fileURLToPath } from "url";
import { dirname, join } from "path";

const __dirname = dirname(fileURLToPath(import.meta.url));
const buildPath = join(__dirname, "build", "server", "index.js");

const { default: build } = await import(buildPath);

const PORT = parseInt(process.env.PORT || "3000", 10);
const HOST = process.env.HOST || "0.0.0.0";

const server = createServer(async (req, res) => {
  try {
    const response = await build(new Request(`http://${req.headers.host}${req.url}`, {
      method: req.method,
      headers: req.headers,
      body: req.method !== "GET" && req.method !== "HEAD" ? req : undefined,
    }));

    res.writeHead(response.status, Object.fromEntries(response.headers));
    res.end(await response.text());
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
