const mongoose = require("mongoose");

const bugLogSchema = new mongoose.Schema({
  title: { type: String, required: true, trim: true, maxlength: 160 },
  technology: { type: String, trim: true, default: "Other", maxlength: 80 },
  severity: { type: String, enum: ["low", "medium", "high"], default: "medium" },
  status: { type: String, enum: ["open", "solved"], default: "open" },
  projectId: { type: mongoose.Schema.Types.ObjectId, ref: "Project", default: null },
  rootCause: { type: String, trim: true, maxlength: 1000, default: "" },
  fix: { type: String, trim: true, maxlength: 1000, default: "" },
  lesson: { type: String, trim: true, maxlength: 1000, default: "" }
}, { timestamps: true });

bugLogSchema.index({ status: 1, createdAt: -1 });
module.exports = mongoose.model("BugLog", bugLogSchema);
