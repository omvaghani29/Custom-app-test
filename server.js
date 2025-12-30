import { createRequestHandler } from "@react-router/node";
import { createServer } from "http";
import { fileURLToPath } from "url";
import { dirname, join } from "path";

const __dirname = dirname(fileURLToPath(import.meta.url));
const buildPath = join(__dirname, "build", "server", "index.js");

const { default: build } = await import(buildPath);
const handler = createRequestHandler(build);

const PORT = process.env.PORT || 3000;
const HOST = process.env.HOST || "0.0.0.0";

const server = createServer(handler);

server.listen(PORT, HOST, () => {
  console.log(`Server running at http://${HOST}:${PORT}`);
});
