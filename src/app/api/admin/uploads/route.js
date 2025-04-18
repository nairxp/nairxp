import { writeFile } from "fs/promises";
import path from "path";
import mongoose from "mongoose";
import { NextResponse } from "next/server";
import ImageModel from "@/models/ImageModel";

export const dynamic = "force-dynamic"; // for file-based APIs

export async function POST(req) {
  const formData = await req.formData();
  const file = formData.get("file");
  // const fName = formData.get('fileName');

  if (!file) {
    return NextResponse.json({ error: "No file uploaded" }, { status: 400 });
  }

  const buffer = Buffer.from(await file.arrayBuffer());
  // const fileName = Date.now() + '-' + file.name;
  const fileName = formData.get("fileName") + ".png";
  const filePath = path.join(process.cwd(), "public/uploads", fileName);

  await writeFile(filePath, buffer);

  await mongoose.connect(process.env.MONGODB_URI);
  const image = new ImageModel({ path: `/uploads/${fileName}` });
  await image.save();

  return NextResponse.json({
    message: "Uploaded successfully",
    path: `/uploads/${fileName}`,
  });
}
