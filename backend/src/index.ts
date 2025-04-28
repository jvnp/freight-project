import { json, urlencoded } from "body-parser";
import express from "express";
import cors from "cors";

import apiRoutes from "./api";
import { env } from "./lib/env";

const app = express();

const PORT = env.PORT || 5000;

app
  .disable("x-powered-by")
  .use(urlencoded({ extended: true }))
  .use(json())
  .use(cors())
  .get("/status", (_, res) => {
    res.json({ status: "ok" });
  })
  .use("/api", apiRoutes);

app.listen(PORT, () => {
  console.log(`Backend server is running on port ${PORT}`);
});
