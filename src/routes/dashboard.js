const router = require("express").Router();
const Skill = require("../models/Skill");
const Project = require("../models/Project");
const Evidence = require("../models/Evidence");
const BugLog = require("../models/BugLog");

router.get("/", async (req, res, next) => {
  try {
    const [skillCount, projectCount, evidenceCount, openBugCount, recentEvidence, skillsByStatus, evidenceByType] =
      await Promise.all([
        Skill.countDocuments(),
        Project.countDocuments(),
        Evidence.countDocuments(),
        BugLog.countDocuments({ status: "open" }),
        Evidence.find().populate("projectId", "name").sort({ createdAt: -1 }).limit(5),
        Skill.aggregate([{ $group: { _id: "$status", count: { $sum: 1 } } }, { $sort: { count: -1 } }]),
        Evidence.aggregate([{ $group: { _id: "$type", count: { $sum: 1 } } }, { $sort: { count: -1 } }])
      ]);

    const demonstratedSkills = await Skill.countDocuments({ status: "demonstrated" });
    res.render("dashboard", {
      title: "Dashboard",
      stats: { skillCount, projectCount, evidenceCount, openBugCount, demonstratedSkills },
      recentEvidence,
      skillsByStatus,
      evidenceByType
    });
  } catch (error) {
    next(error);
  }
});

module.exports = router;
