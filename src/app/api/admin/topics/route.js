import dbConnect from "@/lib/mongoose";
import topicModel from "@/models/topicModel";

export async function GET(req) {
  await dbConnect();
  const topics = await topicModel.find();
  return Response.json(topics);
}

export async function POST(req) {
  await dbConnect();
  const body = await req.json();
  try {
    const found = await topicModel.findOne({ name: body.name });
    if (found) {
      return Response.json(
        { message: "Topic already exists." },
        { status: 401 }
      );
    }
    const topic = await topicModel.create(body);
    return Response.json({ topic }, { status: 201 });
  } catch (err) {
    return Response.json({ error: err.message }, { status: 400 });
  }
}
