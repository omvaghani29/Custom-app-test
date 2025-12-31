import { fileURLToPath } from "url";
import { dirname, join } from "path";

const __dirname = dirname(fileURLToPath(import.meta.url));

// Vercel API Route Handler
export default async function handler(req, res) {
  try {
    // Load build dynamically on each request
    // On Vercel, the build is at ../build relative to the api directory
    let buildModule;
    try {
      const buildPath = join(__dirname, "..", "build", "server", "index.js");
      buildModule = await import(buildPath);
    } catch (pathError) {
      // Try alternative path in case build structure is different
      console.error("Failed to load from standard path, trying alternative...", pathError.message);
      const altPath = join(__dirname, "..", ".vercel", "output", "functions", "api", "server.js");
      buildModule = await import(altPath);
    }

    const build = buildModule.default || buildModule;

    if (!build || typeof build.handleRequest !== 'function') {
      console.error("Build handler not found or not a function");
      res.statusCode = 500;
      res.end("Build handler not found");
      return;
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
    console.error("Server error:", error.message);
    console.error("Stack:", error.stack);
    res.statusCode = 500;
    res.end("Internal Server Error: " + error.message);
  }
}
