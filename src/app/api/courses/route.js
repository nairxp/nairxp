import dbConnect from "@/lib/mongoose";
import courseModel from "@/models/courseModel";
import userModel from "@/models/userModel";
import topicModel from "@/models/topicModel";
import courseTopicsView from "@/models/courseTopicsView";
import { ObjectId } from "mongodb";
import { cookies } from "next/headers";
// export async function GET(req, res) {
//   await dbConnect();
//   const userTopics = await userModel.find({ email: "test@email.com" });
//   // const userTopics = await userModel.find();
//   //console.log(userTopics)
//   const objectIds = await userTopics[0].topics.map((id) => new ObjectId(String(id)));
//   // const courses = await courseTopicsView.find({})
//   const courses = await courseTopicsView.find({
//     _id: { $in: objectIds },
// },{_id:0,"course._id":1,"course.desc":1,"course.name":1});
//   console.log(courses[0])
//   return Response.json(courses);
// }

// export async function GET(req,res) {
//   await dbConnect();
//   const courses = await courseModel.find({active:true});
//   return Response.json(courses);
// }

export async function GET(req, res) {
  await dbConnect();
  const cookieStore = await cookies();
  const email = cookieStore.get("email");
  const role = cookieStore.get("role");
  const userTopics = await userModel.find({ email: email.value });
  // console.log(userTopicss)
  // const userTopics = await userModel.find({ email:"test@email.com" });
  const objectIds = await userTopics[0].topics.map(
    (id) => new ObjectId(String(id))
  );
  let filterObj;
  if (role.value === "admin") {
    filterObj = {};
  } else {
    filterObj = { _id: { $in: objectIds } };
  }

  const courses = await courseTopicsView.distinct("course", filterObj);

  // const courses = await courseModel.aggregate([
    
  //   {
  //     $lookup: {
  //       from: "topics",
  //       localField: "_id",
  //       foreignField: "courseId",
  //       as: "topic",
  //     },
  //   },
  //   {
  //     $unwind: "$topic",
  //   },
  // ])
  // console.log(courses)

  // const courses = await courseTopicsView.distinct("course", {
  //   _id: { $in: objectIds },
  // });

  ///////////////////////////////////////
  // const courses = await courseTopicsView.aggregate([
  //   {
  //     $match: { _id: { $in: objectIds } },
  //   },
  //   {
  //     $group: {
  //       _id: {
  //         courseId: "$courseId",
  //         courseName: "$courseName",
  //         courseDesc: "$courseDesc",
  //       },
  //     },
  //   },
  // ]);

  ///////////////////////////////////////////
  // const courses = await courseTopicsView.find(
  //   {
  //     _id: { $in: objectIds },
  //   },
  //   { _id: 0, "course._id": 1, "course.desc": 1, "course.name": 1 }
  // );

  return Response.json(courses);
}
