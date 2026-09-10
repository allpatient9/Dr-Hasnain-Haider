import express from "express";
import path from "path";
import fs from "fs";
import { createServer as createViteServer } from "vite";

async function startServer() {
  const app = express();
  const PORT = 3000;

  // Middleware for parsing JSON with ample capacity for base64 image uploads
  app.use(express.json({ limit: "30mb" }));

  // API Health Check
  app.get("/api/health", (req, res) => {
    res.json({
      status: "ok",
      uptime: process.uptime(),
      timestamp: new Date().toISOString(),
    });
  });

  // API Endpoint: Sync and permanently save Doctor's Photo
  app.post("/api/upload-doctor-photo", (req, res) => {
    try {
      const { dataUrl } = req.body;
      if (!dataUrl || typeof dataUrl !== "string" || !dataUrl.includes("base64,")) {
        return res.status(400).json({ error: "Invalid image data format. Expected base64 dataUrl." });
      }

      const matches = dataUrl.match(/^data:image\/([a-zA-Z0-9.+]+);base64,(.+)$/);
      if (!matches || matches.length < 3) {
        return res.status(400).json({ error: "Could not parse base64 image payload" });
      }

      const base64Data = matches[2];
      const buffer = Buffer.from(base64Data, "base64");

      // 1. Write permanently to public/images/dr-hasnain-haider.jpg
      const publicPath = path.join(process.cwd(), "public", "images", "dr-hasnain-haider.jpg");
      fs.writeFileSync(publicPath, buffer);

      // 2. Also keep src/assets/images/dr-hasnain-haider.jpg synced
      const srcAssetPath = path.join(process.cwd(), "src", "assets", "images", "dr-hasnain-haider.jpg");
      try {
        fs.writeFileSync(srcAssetPath, buffer);
      } catch (e) {
        console.warn("Could not write to src/assets/images:", e);
      }

      // 3. Also update dist/images/dr-hasnain-haider.jpg if production build exists
      const distPath = path.join(process.cwd(), "dist", "images", "dr-hasnain-haider.jpg");
      try {
        if (fs.existsSync(path.dirname(distPath))) {
          fs.writeFileSync(distPath, buffer);
        }
      } catch (e) {
        console.warn("Could not write to dist/images:", e);
      }

      console.log(`[Server] Doctor photo successfully updated and synced (${buffer.length} bytes).`);

      return res.json({
        success: true,
        message: "Doctor photograph saved and synchronized across public, source, and build directories.",
        bytesWritten: buffer.length,
        imagePath: "/images/dr-hasnain-haider.jpg",
      });
    } catch (err: any) {
      console.error("[Server] Error in /api/upload-doctor-photo:", err);
      return res.status(500).json({ error: err.message || "Failed to persist photograph" });
    }
  });

  // API Endpoint: Clinic metadata and settings verification
  app.get("/api/clinic-settings", (req, res) => {
    res.json({
      status: "synced",
      domain: "hasnainent.com",
      doctorName: "Dr. Hasnain Haider",
      doctorImage: "/images/dr-hasnain-haider.jpg",
      clinicLocation: "Johar Town, Lahore",
      verified: true,
    });
  });

  // Vite middleware for development vs Static serving for production
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

startServer();
