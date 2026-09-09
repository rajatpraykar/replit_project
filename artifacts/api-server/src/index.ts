import app from "./app";
import { logger } from "./lib/logger";

const rawPort = process.env["PORT"] ?? "3000";
const port = Number(rawPort);

if (Number.isNaN(port) || port <= 0) {
  throw new Error(`Invalid PORT value: "${rawPort}"`);
}

// Express 5 app.listen() returns the server, callback has no error param.
// Use the 'error' event on the server for robust error handling.
const server = app.listen(port, "0.0.0.0", () => {
  logger.info({ port, host: "0.0.0.0" }, "🪔 KalaSetu API Gateway is live across all network interfaces");
});

server.on("error", (err: NodeJS.ErrnoException) => {
  if (err.code === "EADDRINUSE") {
    logger.error({ port }, `Port ${port} is already in use. Kill the existing process or use a different port.`);
  } else {
    logger.error({ err }, "Server startup error");
  }
  process.exit(1);
});
