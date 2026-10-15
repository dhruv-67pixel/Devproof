const router = require("express").Router();
const Skill = require("../models/Skill");
const Evidence = require("../models/Evidence");

router.get("/", async (req, res, next) => {
  try {
    const skills = await Skill.find().sort({ createdAt: -1 });
    res.render("skills/index", { title: "Skill Vault", skills });
  } catch (e) { next(e); }
});

router.get("/new", (req, res) => res.render("skills/form", {
  title: "Add skill", skill: {}, action: "/skills", isEdit: false
}));

router.post("/", async (req, res, next) => {
  try {
    await Skill.create({
      name: req.body.name,
      category: req.body.category,
      status: req.body.status,
      level: req.body.level,
      notes: req.body.notes
    });
    res.redirect("/skills");
  } catch (e) {
    if (e.code === 11000) return res.status(400).render("error", { title: "Duplicate skill", message: "A skill with that name already exists. Go back and use a different name." });
    next(e);
  }
});

router.get("/:id/edit", async (req, res, next) => {
  try {
    const skill = await Skill.findById(req.params.id);
    if (!skill) return res.status(404).render("404", { title: "Skill not found" });
    res.render("skills/form", { title: "Edit skill", skill, action: `/skills/${skill._id}?_method=PUT`, isEdit: true });
  } catch (e) { next(e); }
});

router.put("/:id", async (req, res, next) => {
  try {
    await Skill.findByIdAndUpdate(req.params.id, {
      name: req.body.name,
      category: req.body.category,
      status: req.body.status,
      level: req.body.level,
      notes: req.body.notes
    }, { runValidators: true });
    res.redirect("/skills");
  } catch (e) { next(e); }
});

router.delete("/:id", async (req, res, next) => {
  try {
    const skill = await Skill.findById(req.params.id);
    if (skill) {
      await Evidence.updateMany({ skillIds: skill._id }, { $pull: { skillIds: skill._id } });
      await skill.deleteOne();
    }
    res.redirect("/skills");
  } catch (e) { next(e); }
});

module.exports = router;
