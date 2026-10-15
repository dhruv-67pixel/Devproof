const router = require("express").Router();
const BugLog = require("../models/BugLog");
const Project = require("../models/Project");

router.get("/", async (req, res, next) => {
  try {
    const bugs = await BugLog.find().populate("projectId", "name").sort({ createdAt: -1 });
    res.render("bugs/index", { title: "Bug Journal", bugs });
  } catch (e) { next(e); }
});

router.get("/new", async (req, res, next) => {
  try {
    const projects = await Project.find().sort({ name: 1 });
    res.render("bugs/form", { title: "Log a bug", bug: {}, projects, action: "/bugs", isEdit: false });
  } catch (e) { next(e); }
});

router.post("/", async (req, res, next) => {
  try {
    await BugLog.create({
      title: req.body.title, technology: req.body.technology, severity: req.body.severity,
      status: req.body.status, projectId: req.body.projectId || null,
      rootCause: req.body.rootCause, fix: req.body.fix, lesson: req.body.lesson
    });
    res.redirect("/bugs");
  } catch (e) { next(e); }
});

router.get("/:id/edit", async (req, res, next) => {
  try {
    const [bug, projects] = await Promise.all([BugLog.findById(req.params.id), Project.find().sort({ name: 1 })]);
    if (!bug) return res.status(404).render("404", { title: "Bug not found" });
    res.render("bugs/form", { title: "Edit bug", bug, projects, action: `/bugs/${bug._id}?_method=PUT`, isEdit: true });
  } catch (e) { next(e); }
});

router.put("/:id", async (req, res, next) => {
  try {
    await BugLog.findByIdAndUpdate(req.params.id, {
      title: req.body.title, technology: req.body.technology, severity: req.body.severity,
      status: req.body.status, projectId: req.body.projectId || null,
      rootCause: req.body.rootCause, fix: req.body.fix, lesson: req.body.lesson
    }, { runValidators: true });
    res.redirect("/bugs");
  } catch (e) { next(e); }
});

router.delete("/:id", async (req, res, next) => {
  try {
    await BugLog.findByIdAndDelete(req.params.id);
    res.redirect("/bugs");
  } catch (e) { next(e); }
});

module.exports = router;
