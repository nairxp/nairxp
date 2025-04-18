import mongoose from 'mongoose'
const courseSchema = mongoose.Schema(
  {
    name: { type: String, required: true },
    desc: { type: String, required: true },
    imgUrl: { type: String, required: true },
    active: { type: Boolean, default: true },
  },
  { timestamps: true }
);

export default mongoose.models.Course ||  mongoose.model("Course", courseSchema);