import dbConnect from "@/lib/mongoose";
import topicModel from "@/models/topicModel";
import userModel from "@/models/userModel";
import courseTopicsView from "@/models/courseTopicsView";
import { cookies } from "next/headers";
import { ObjectId } from "mongodb";
export async function GET(req, { params }) {
  await dbConnect();
  const { id } = await params;
  const courseId = new ObjectId(String(id));
  const cookieStore = await cookies();
  const email = cookieStore.get("email");
  const role = cookieStore.get("role");

  try {
    //const userTopics = await userModel.find({ email: "test@email.com" });
    const userTopics = await userModel.find({ email: email.value });
    // const objectIds = await userTopics[0].topics.map(
    //   (id) => new ObjectId(String(id))
    // );
    const objectIds = userTopics[0].topics.map(
      (id) => new ObjectId(String(id))
    );

    let filterObj;
    if (role.value === "admin") {
      filterObj = { courseId: new ObjectId(String(id)) };
    } else {
      filterObj = { courseId: new ObjectId(String(id)), _id: { $in: objectIds } };
    }

    //const topics = await courseTopicsView.distinct("course", filterObj);
    const topics = await courseTopicsView.find(filterObj);
    // const topics = await courseTopicsView.find({
    //   courseId: courseId,
    //   _id: { $in: objectIds },
    // });

    return Response.json(topics);
  } catch (err) {
    return Response.json({ message: "something went wrong" });
  }
}

// export async function GET(req, { params }) {
//   const { id } = await params;
//   await dbConnect();
//   try {
//     const topics = await topicModel.find({ courseId: id, active: true });
//     return Response.json(topics);
//   } catch (err) {
//     return Response.json({ message: "something went wrong" });
//   }
// }
