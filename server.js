import { createServer } from "http";
import { fileURLToPath } from "url";
import { dirname, join } from "path";

const __dirname = dirname(fileURLToPath(import.meta.url));
const build = await import(join(__dirname, "build/server/index.js"));

const PORT = process.env.PORT || 3000;
const HOST = "0.0.0.0";

const server = createServer(async (req, res) => {
  try {
    const response = await build.handleRequest(req, {
      getLoadContext() {
        return {};
      },
    });

    res.statusCode = response.status;
    response.headers.forEach((value, key) => {
      res.setHeader(key, value);
    });

    res.end(await response.text());
  } catch (error) {
    console.error("Server error:", error);
    res.statusCode = 500;
    res.end("Internal Server Error");
  }
});

server.listen(PORT, HOST, () => {
  console.log(`✓ Server running at http://${HOST}:${PORT}`);
});
