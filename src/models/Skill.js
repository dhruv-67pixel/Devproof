const mongoose = require("mongoose");

const skillSchema = new mongoose.Schema({
  name: { type: String, required: true, trim: true, maxlength: 80 },
  category: {
    type: String,
    enum: ["Frontend", "Backend", "Database", "Tools", "Other"],
    default: "Other"
  },
  status: {
    type: String,
    enum: ["learning", "practicing", "demonstrated"],
    default: "learning"
  },
  level: {
    type: String,
    enum: ["beginner", "intermediate", "advanced"],
    default: "beginner"
  },
  notes: { type: String, trim: true, maxlength: 500, default: "" }
}, { timestamps: true });

skillSchema.index({ name: 1 }, { unique: true });
module.exports = mongoose.model("Skill", skillSchema);
