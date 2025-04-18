import dbConnect from "@/lib/mongoose";
import courseModel from "@/models/courseModel";

export async function GET(req,res) {
  await dbConnect();
  const courses = await courseModel.find({active:true});
  return Response.json(courses);
}

export async function POST(req) {
  await dbConnect();
  const body = await req.json();
  try {
    const found = await courseModel.findOne({ name: body.name });
    if (found) {
      return Response.json(
        { message: "Course already exists." },
        { status: 401 }
      );
    }
    const course = await courseModel.create(body);
    return Response.json({ course }, { status: 200 });
  } catch (err) {
    return Response.json({ error: err.message }, { status: 500 });
  }
}
