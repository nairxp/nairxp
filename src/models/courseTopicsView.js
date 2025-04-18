import mongoose from "mongoose";

const courseTopicsSchema = new mongoose.Schema(
  {},
  {
    collection: 'courseTopicsView',
  }
);
export default mongoose.models.CourseTopics || mongoose.model('CourseTopics', courseTopicsSchema);


