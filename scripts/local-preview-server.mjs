import fs from "node:fs";
import http from "node:http";
import path from "node:path";
import { Readable } from "node:stream";
import { fileURLToPath } from "node:url";
import worker from "../dist/server/index.js";

const projectRoot = path.dirname(path.dirname(fileURLToPath(import.meta.url)));
const clientRoot = path.join(projectRoot, "dist", "client");
const host = "127.0.0.1";
const port = Number(process.env.AIHERO_PREVIEW_PORT ?? 4321);
if (!Number.isInteger(port) || port < 1 || port > 65535) throw new Error('Invalid AIHERO_PREVIEW_PORT');

const contentTypes = new Map([
  [".css", "text/css; charset=utf-8"],
  [".gif", "image/gif"],
  [".html", "text/html; charset=utf-8"],
  [".ico", "image/x-icon"],
  [".jpeg", "image/jpeg"],
  [".jpg", "image/jpeg"],
  [".js", "text/javascript; charset=utf-8"],
  [".json", "application/json; charset=utf-8"],
  [".png", "image/png"],
  [".svg", "image/svg+xml"],
  [".webp", "image/webp"],
  [".woff", "font/woff"],
  [".woff2", "font/woff2"],
]);

function resolveAsset(url) {
  const pathname = decodeURIComponent(new URL(url).pathname);
  const relative = pathname.replace(/^\/+/, "");
  const candidate = path.resolve(clientRoot, relative);
  if (candidate === clientRoot || !candidate.startsWith(`${clientRoot}${path.sep}`)) return null;
  return candidate;
}

const assets = {
  async fetch(request) {
    const assetPath = resolveAsset(request.url);
    if (!assetPath) return new Response("Not found", { status: 404 });
    try {
      const stat = fs.statSync(assetPath);
      if (!stat.isFile()) return new Response("Not found", { status: 404 });
      const headers = new Headers({
        "content-length": String(stat.size),
        "content-type": contentTypes.get(path.extname(assetPath).toLowerCase()) ?? "application/octet-stream",
      });
      if (request.method === "HEAD") return new Response(null, { status: 200, headers });
      return new Response(fs.readFileSync(assetPath), { status: 200, headers });
    } catch (error) {
      if (error?.code === "ENOENT") return new Response("Not found", { status: 404 });
      throw error;
    }
  },
};

function createRequest(incoming) {
  const url = `http://${incoming.headers.host ?? `${host}:${port}`}${incoming.url ?? "/"}`;
  const init = {
    method: incoming.method,
    headers: incoming.headers,
  };
  if (incoming.method !== "GET" && incoming.method !== "HEAD") {
    init.body = Readable.toWeb(incoming);
    init.duplex = "half";
  }
  return new Request(url, init);
}

const server = http.createServer(async (incoming, outgoing) => {
  try {
    const request = createRequest(incoming);
    const pending = [];
    const staticResponse = await assets.fetch(request);
    const response = staticResponse.ok
      ? staticResponse
      : await worker.fetch(request, { ASSETS: assets }, {
          waitUntil(promise) {
            pending.push(Promise.resolve(promise));
          },
        });

    outgoing.statusCode = response.status;
    response.headers.forEach((value, name) => outgoing.setHeader(name, value));
    if (!response.body) {
      outgoing.end();
    } else {
      Readable.fromWeb(response.body).pipe(outgoing);
    }
    Promise.allSettled(pending).catch(() => {});
  } catch (error) {
    console.error(error);
    if (!outgoing.headersSent) {
      outgoing.statusCode = 500;
      outgoing.setHeader("content-type", "text/plain; charset=utf-8");
    }
    outgoing.end("本地预览服务发生错误。请查看 preview-error.log。\n");
  }
});

server.listen(port, host, () => {
  console.log(`AI Hero local preview ready at http://${host}:${port}`);
});

function shutdown() {
  server.close(() => process.exit(0));
}

process.on("SIGINT", shutdown);
process.on("SIGTERM", shutdown);
