import dbConnect from "@/lib/mongoose";
import topicModel from "@/models/topicModel";
export async function GET(req, { params }) {
  const { id } = await params;
  await dbConnect();
  try {
    const topics = await topicModel.find({ _id: id });
    // const topics = await topicModel.find({ courseId: id, active: true });
    // const topics = await topicModel.findOne({courseId:id}).sort({ _id: -1 });
    return Response.json(topics);
  } catch (err) {
    return Response.json({ message: "something went wrong" });
  }
}

export async function PATCH(req, { params }) {
  const { id } = await params;
  const body = await req.json();
  await dbConnect();
  try {
    // const topics = await topicModel.findByIdAndUpdate(id, { active: false });
    const topics = await topicModel.findByIdAndUpdate(id, body);
    return Response.json(topics, { message: "ok" });
  } catch (err) {
    return Response.json({ message: "something went wrong" });
  }
}


export async function DELETE(req, { params }) {
  const { id } = await params;
  await dbConnect();
  try {
    const topics = await topicModel.findByIdAndUpdate(id, { active: false });
    return Response.json(topics, { message: "ok" });
  } catch (err) {
    return Response.json({ message: "something went wrong" });
  }
}