import express from "express";
import helmet from "helmet";
import compression from "compression";

export interface Parameters {
  "Content-Type": Array<"JSON" | "URL-encoded">;
  hostname: string;
}

export default function Express(params: Parameters) {
  let app = express();

  // Disable X-Powered-By
  app.disable("x-powered-by");

  app.use(helmet());

  app.use(compression());

  if (params["Content-Type"].includes("JSON"))
    app.use(express.json({ limit: "50mb" }));

  if (params["Content-Type"].includes("URL-encoded"))
    app.use(express.urlencoded({ limit: "50mb", extended: true }));

  // @ts-ignore
  app.use((err, req, res, next) => {
    if (err.stack && process.env.NODE_ENV !== "development") {
      res.status(400).end("Unkown Error");
    }
  });

  return app;
}
