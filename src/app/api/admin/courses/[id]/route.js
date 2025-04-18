import dbConnect from "@/lib/mongoose";
import courseModel from "@/models/courseModel";

export async function GET(req, { params }) {
  await dbConnect();
  const { id } = await params;
  const courses = await courseModel.findOne({ _id: id });
  return Response.json(courses);
}

// export async function DELETE(req, { params }) {
//   await dbConnect();
//   const { id } = await params;
//   const courses = await courseModel.findByIdAndDelete({ _id: id });
//   return Response.json(courses);
// }

export async function PATCH(req, { params }) {
  await dbConnect();
  const { id } = await params;
  const body = await req.json();
  console.log(body)
  const courses = await courseModel.findByIdAndUpdate(id, body);
  return Response.json(courses);
}

export async function DELETE(req, { params }) {
  await dbConnect();
  const { id } = await params;
  const courses = await courseModel.findByIdAndUpdate(id, { active: false });
  return Response.json(courses);
}
