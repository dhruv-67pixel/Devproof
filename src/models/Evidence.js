const mongoose = require("mongoose");

const evidenceSchema = new mongoose.Schema({
  title: { type: String, required: true, trim: true, maxlength: 120 },
  description: { type: String, trim: true, maxlength: 1000, default: "" },
  type: {
    type: String,
    enum: ["feature", "bug-fix", "tutorial", "challenge", "other"],
    default: "feature"
  },
  projectId: { type: mongoose.Schema.Types.ObjectId, ref: "Project", required: true },
  skillIds: [{ type: mongoose.Schema.Types.ObjectId, ref: "Skill" }],
  proofUrl: { type: String, trim: true, default: "" },
  verified: { type: Boolean, default: false }
}, { timestamps: true });

evidenceSchema.index({ projectId: 1, createdAt: -1 });
evidenceSchema.index({ skillIds: 1 });
module.exports = mongoose.model("Evidence", evidenceSchema);
