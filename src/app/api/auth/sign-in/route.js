import dbConnect from "@/lib/mongoose";
import UserModel from "@/models/userModel";
import { hashPassword, comparePassword } from "@/lib/hash";
import { signToken } from "@/lib/jwt";
export async function POST(req) {
  await dbConnect();
  const body = await req.json();

  try {
    const found = await UserModel.findOne({
      email: body.email,
    });
    if (!found) {
      return Response.json({ message: "User not found" });
    }
    const matchPassword = await comparePassword(body.pass, found.pass);
    if (!matchPassword) {
      return Response.json({ message: "Invalid Password" });
    }
    const token = signToken({
      name: found.name,
      email: found.email,
      role: found.role,
    });
    const data = {
      name: found.name,
      email: found.email,
      role: found.role,
      token: token,
      message: "ok",
    };
    return Response.json(data);
  } catch (err) {
    return Response.json(
      { error: err.message },
      { message: "Something went wrong" }
    );
  }
}
