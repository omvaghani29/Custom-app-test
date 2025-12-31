import { fileURLToPath } from "url";
import { dirname, join } from "path";

const __dirname = dirname(fileURLToPath(import.meta.url));

// Vercel API Route Handler
export default async function handler(req, res) {
  try {
    // Load build dynamically on each request
    let buildModule;
    
    // Try multiple possible paths for the build
    const possiblePaths = [
      // Standard React Router build
      join(__dirname, "..", "build", "server", "index.js"),
      // Vercel output structure
      join(__dirname, "..", ".vercel", "output", "functions", "api", "server.js"),
      // Vercel functions directory
      join(__dirname, "..", "functions", "server.js"),
    ];
    
    let lastError;
    for (const buildPath of possiblePaths) {
      try {
        console.log(`Attempting to load build from: ${buildPath}`);
        buildModule = await import(buildPath);
        console.log(`Successfully loaded from: ${buildPath}`);
        break;
      } catch (err) {
        lastError = err;
        console.log(`Failed to load from ${buildPath}: ${err.message}`);
      }
    }
    
    if (!buildModule) {
      throw lastError || new Error("Could not load build from any path");
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
