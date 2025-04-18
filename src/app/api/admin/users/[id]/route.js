import dbConnect from "@/lib/mongoose";
import userModel from "@/models/userModel";

export async function GET(req, { params }) {
  await dbConnect();
  const { id } = await params;
  const users = await userModel.findOne({ _id: id });
  return Response.json(users);
}

export async function PATCH(req, { params }) {
  await dbConnect();
  const body = await req.json();
  const { id } = await params;
  const users = await userModel.findByIdAndUpdate(id, body);
  return Response.json(users);
}
