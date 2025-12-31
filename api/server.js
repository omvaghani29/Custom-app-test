import { fileURLToPath } from "url";
import { dirname, join } from "path";

const __dirname = dirname(fileURLToPath(import.meta.url));

let build;

// React Router builds to build/server/index.js
const buildPath = join(__dirname, "..", "build", "server", "index.js");

try {
  const buildModule = await import(buildPath);
  build = buildModule.default || buildModule;
  console.log(`Successfully loaded build from: ${buildPath}`);
} catch (error) {
  console.error("Failed to load build module:", error.message);
  throw new Error(`Build module not found at ${buildPath}. Make sure to run 'npm run build' first.`);
}

// Vercel API Route Handler
export default async function handler(req, res) {
  try {
    if (!build || !build.handleRequest) {
      throw new Error("Build handler not found");
    }

    const response = await build.handleRequest(req, {
      getLoadContext() {
        return {};
      },
    });

    res.statusCode = response.status;
    response.headers.forEach((value, key) => {
      res.setHeader(key, value);
    });

    const body = await response.text();
    res.end(body);
  } catch (error) {
    console.error("Server error:", error);
    res.statusCode = 500;
    res.end("Internal Server Error");
  }
}
