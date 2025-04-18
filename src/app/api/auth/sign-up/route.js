import dbConnect from "@/lib/mongoose";
import UserModel from "@/models/userModel";
import { signToken } from "@/lib/jwt";
import { hashPassword } from "@/lib/hash";
export async function POST(req) {
  await dbConnect();
  const body = await req.json();
  try {
    const found = await UserModel.findOne({ email: body.email });
    if (found) {
      return Response.json(
        { message: "User already exists." },
        { status: 401 }
      );
    }
    body.pass = await hashPassword(body.pass)
    const user = await UserModel.create(body);
    const token = signToken({
      name: user.name,
      email: user.email,
      role: user.role,
    });
    return Response.json({ token }, { status: 201 });
  } catch (err) {
    return Response.json({ error: err.message }, { status: 400 });
  }
}
