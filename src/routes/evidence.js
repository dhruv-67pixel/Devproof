const router = require("express").Router();
const Evidence = require("../models/Evidence");
const Project = require("../models/Project");
const Skill = require("../models/Skill");

router.get("/", async (req, res, next) => {
  try {
    const evidence = await Evidence.find().populate("projectId", "name").populate("skillIds", "name").sort({ createdAt: -1 });
    res.render("evidence/index", { title: "Evidence Tracker", evidence });
  } catch (e) { next(e); }
});

router.get("/new", async (req, res, next) => {
  try {
    const [projects, skills] = await Promise.all([Project.find().sort({ name: 1 }), Skill.find().sort({ name: 1 })]);
    res.render("evidence/form", { title: "Add evidence", evidence: {}, projects, skills, action: "/evidence", isEdit: false });
  } catch (e) { next(e); }
});

router.post("/", async (req, res, next) => {
  try {
    const skillIds = Array.isArray(req.body.skillIds) ? req.body.skillIds : (req.body.skillIds ? [req.body.skillIds] : []);
    await Evidence.create({
      title: req.body.title, description: req.body.description, type: req.body.type,
      projectId: req.body.projectId, skillIds, proofUrl: req.body.proofUrl,
      verified: req.body.verified === "on"
    });
    res.redirect("/evidence");
  } catch (e) { next(e); }
});

router.get("/:id/edit", async (req, res, next) => {
  try {
    const [evidence, projects, skills] = await Promise.all([
      Evidence.findById(req.params.id), Project.find().sort({ name: 1 }), Skill.find().sort({ name: 1 })
    ]);
    if (!evidence) return res.status(404).render("404", { title: "Evidence not found" });
    res.render("evidence/form", { title: "Edit evidence", evidence, projects, skills, action: `/evidence/${evidence._id}?_method=PUT`, isEdit: true });
  } catch (e) { next(e); }
});

router.put("/:id", async (req, res, next) => {
  try {
    const skillIds = Array.isArray(req.body.skillIds) ? req.body.skillIds : (req.body.skillIds ? [req.body.skillIds] : []);
    await Evidence.findByIdAndUpdate(req.params.id, {
      title: req.body.title, description: req.body.description, type: req.body.type,
      projectId: req.body.projectId, skillIds, proofUrl: req.body.proofUrl,
      verified: req.body.verified === "on"
    }, { runValidators: true });
    res.redirect("/evidence");
  } catch (e) { next(e); }
});

router.delete("/:id", async (req, res, next) => {
  try {
    await Evidence.findByIdAndDelete(req.params.id);
    res.redirect("/evidence");
  } catch (e) { next(e); }
});

module.exports = router;
