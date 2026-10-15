require("dotenv").config();

const express = require("express");
const mongoose = require("mongoose");
const methodOverride = require("method-override");
const path = require("path");

const dashboardRoutes = require("./src/routes/dashboard");
const skillRoutes = require("./src/routes/skills");
const projectRoutes = require("./src/routes/projects");
const evidenceRoutes = require("./src/routes/evidence");
const bugRoutes = require("./src/routes/bugs");

const app = express();
const PORT = process.env.PORT || 3000;

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "src", "views"));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(methodOverride("_method"));
app.use(express.static(path.join(__dirname, "public")));

app.use((req, res, next) => {
  res.locals.currentPath = req.path;
  res.locals.formatDate = (date) => date ? new Date(date).toLocaleDateString() : "—";
  next();
});

app.get("/", (req, res) => res.redirect("/dashboard"));
app.use("/dashboard", dashboardRoutes);
app.use("/skills", skillRoutes);
app.use("/projects", projectRoutes);
app.use("/evidence", evidenceRoutes);
app.use("/bugs", bugRoutes);

app.use((req, res) => {
  res.status(404).render("404", { title: "Page not found" });
});

app.use((err, req, res, next) => {
  console.error(err);
  const message = process.env.NODE_ENV === "production"
    ? "Something went wrong. Please try again."
    : err.message;
  res.status(500).render("error", { title: "Error", message });
});

async function start() {
  try {
    const mongoUri = process.env.MONGODB_URI || "mongodb://127.0.0.1:27017/devproof";
    await mongoose.connect(mongoUri);
    console.log("Connected to MongoDB");
    app.listen(PORT, () => console.log(`DevProof running at http://localhost:${PORT}`));
  } catch (error) {
    console.error("Could not connect to MongoDB:", error.message);
    process.exit(1);
  }
}

start();
