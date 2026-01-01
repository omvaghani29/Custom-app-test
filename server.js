import { createServer } from "http";
import { fileURLToPath } from "url";
import { dirname, join } from "path";

const __dirname = dirname(fileURLToPath(import.meta.url));
const build = await import(join(__dirname, "build/server/index.js"));

const PORT = Number(process.env.PORT) || 3000;
const HOST = "0.0.0.0";

const server = createServer(async (req, res) => {
  try {
    const response = await build.default.fetch(req);

    res.statusCode = response.status;
    response.headers.forEach((value, key) => {
      res.setHeader(key, value);
    });

    const body = response.body ? Buffer.from(await response.arrayBuffer()) : null;
    res.end(body);
  } catch (error) {
    console.error("Server error:", error);
    res.statusCode = 500;
    res.end("Internal Server Error");
  }
});

server.listen(PORT, HOST, () => {
  console.log(`✓ Server running on http://${HOST}:${PORT}`);
});
