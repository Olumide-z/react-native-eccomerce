import express from "express";
import { ENV } from "./config/env";

const app = express();

const __dirname = path.resolve();

// make our app ready for deployment
if (ENV.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "../admin/dist")));

  app.get("/{*any}", (req, res) => {
    res.sendFile(path.join(__dirname, "../admin", "dist", "index.html"));
  });
}

app.listen(ENV.PORT, () => console.log(`Server running on port ${ENV.PORT}`));
