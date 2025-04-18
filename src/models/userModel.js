import mongoose from "mongoose";
const userSchema = mongoose.Schema(
  {
    name: { type: String, required: true },
    pass: { type: String, required: true },
    email: { type: String, required: true },
    role: { type: String, default: "user" },
    orgName: { type: String, default: "NA" },
    active: { type: Boolean, default: true },
    topics: { type: [String] },
  },
  { timestamps: true }
);

// export default mongoose.model("User", userSchema);

export default mongoose.models.User || mongoose.model("User", userSchema);
