const router = require("express").Router();
const Project = require("../models/Project");
const Evidence = require("../models/Evidence");
const BugLog = require("../models/BugLog");

router.get("/", async (req, res, next) => {
  try {
    const projects = await Project.find().sort({ updatedAt: -1 });
    const evidenceCounts = await Evidence.aggregate([
      { $group: { _id: "$projectId", count: { $sum: 1 } } }
    ]);
    const countMap = Object.fromEntries(evidenceCounts.map(x => [String(x._id), x.count]));
    res.render("projects/index", { title: "Project Vault", projects, countMap });
  } catch (e) { next(e); }
});

router.get("/new", (req, res) => res.render("projects/form", {
  title: "Add project", project: {}, action: "/projects", isEdit: false
}));

router.post("/", async (req, res, next) => {
  try {
    await Project.create({
      name: req.body.name, description: req.body.description, status: req.body.status,
      githubUrl: req.body.githubUrl, liveUrl: req.body.liveUrl
    });
    res.redirect("/projects");
  } catch (e) { next(e); }
});

router.get("/:id/edit", async (req, res, next) => {
  try {
    const project = await Project.findById(req.params.id);
    if (!project) return res.status(404).render("404", { title: "Project not found" });
    res.render("projects/form", { title: "Edit project", project, action: `/projects/${project._id}?_method=PUT`, isEdit: true });
  } catch (e) { next(e); }
});

router.put("/:id", async (req, res, next) => {
  try {
    await Project.findByIdAndUpdate(req.params.id, {
      name: req.body.name, description: req.body.description, status: req.body.status,
      githubUrl: req.body.githubUrl, liveUrl: req.body.liveUrl
    }, { runValidators: true });
    res.redirect("/projects");
  } catch (e) { next(e); }
});

router.delete("/:id", async (req, res, next) => {
  try {
    const id = req.params.id;
    await Evidence.deleteMany({ projectId: id });
    await BugLog.updateMany({ projectId: id }, { $set: { projectId: null } });
    await Project.findByIdAndDelete(id);
    res.redirect("/projects");
  } catch (e) { next(e); }
});

module.exports = router;
