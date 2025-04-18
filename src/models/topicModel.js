import mongoose from "mongoose";
const topicSchema = mongoose.Schema(
  {
    sqNum: { type: Number, required: true },
    name: { type: String, required: true },
    desc: { type: String, required: true },
    code: { type: String, required: true },
    imgUrl: { type: String },
    subTopic1: { type: String },
    desc1: { type: String },
    example1: { type: String },
    subTopic2: { type: String },
    desc2: { type: String },
    example2: { type: String },
    subTopic3: { type: String },
    desc3: { type: String },
    example3: { type: String },
    subTopic4: { type: String },
    desc4: { type: String },
    example4: { type: String },
    subTopic5: { type: String },
    desc5: { type: String },
    example5: { type: String },
    courseId: { type: mongoose.Schema.Types.ObjectId, ref: "Course" },
    active: { type: Boolean, default: true },
  },
  { timestamps: true }
);

export default mongoose.models.Topic || mongoose.model("Topic", topicSchema);

// {
//   name: { type: String, required: true },
//   desc: { type: String},
//   code: { type: String, required: true },
//   courseId: { type: mongoose.Schema.Types.ObjectId, ref: "Course" },
//   active: { type: Boolean, default: true },
// }
