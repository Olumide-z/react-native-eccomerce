import path from "path";
import express from "express";
import { ENV } from "./config/env.js";
import { connectDB } from "./config/db.js";

import { serve } from "inngest/express";
import { functions, inngest } from "./config/ingest.js";

const app = express();

const __dirname = path.resolve();

app.use(express.json());
// adds auth object under the req
app.use(clerkMiddleware());

app.use("/api/inngest", serve({ client: inngest, functions }));

// make our app ready for deployment
if (ENV.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "../admin/dist")));

  app.get("/{*any}", (req, res) => {
    res.sendFile(path.join(__dirname, "../admin", "dist", "index.html"));
  });
}

const startServer = () => {
  connectDB();
  app.listen(ENV.PORT, () => {
    console.log(`Server running on port ${ENV.PORT}`);
  });
};

startServer();
