const express = require("express");
const sequelize = require("./config/db.config");
const User = require("./models/User");
const courseRoutes = require("./routes/course");
const Course = require("./models/CourseModel");
const uploadRoutes = require("./routes/upload");

const app = express();
const PORT = process.env.PORT || 3000;

const authRoutes = require("./routes/auth");

app.use(express.json());

app.use("/uploads", express.static("uploads"));

app.get("/", (req, res) => {
  res.json({
    message: "EduCourse API Server",
    version: "1.0.0",
    status: "running",
    endpoints: {
      auth: {
        register: "POST /api/auth/register",
        login: "POST /api/auth/login", 
        verifyEmail: "GET /api/auth/verify-email?token=<token>"
      },
      courses: {
        list: "GET /api/courses/ (requires auth token)"
      },
      upload: {
        file: "POST /api/upload (requires auth token)"
      }
    }
  });
});

app.use("/api/auth", authRoutes);
app.use("/api/courses", courseRoutes);
app.use("/api/upload", uploadRoutes);

sequelize
  .sync({ force: false, alter: true })
  .then(() => {
    console.log("Database dan tabel berhasil disinkronisasi.");

    app.listen(PORT, () => {
      console.log(`Server berjalan di http://localhost:${PORT}`);
      console.log(`API Documentation: http://localhost:${PORT}/`);
    });
  })
  .catch((err) => {
    console.error("Gagal sinkronisasi database:", err);
  });
