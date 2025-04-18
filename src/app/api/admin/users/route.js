import dbConnect from "@/lib/mongoose";
import userModel from "@/models/userModel";

export async function GET(req) {
  await dbConnect();
  const users = await userModel.find();
  return Response.json(users);
}
