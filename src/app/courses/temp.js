db.createView("courseTopicsView", "topics", [
  {
    $lookup: {
      from: "courses",
      localField: "courseId",
      foreignField: "_id",
      as: "course",
    },
  },
]);

db.createView("courseTopicsView", "topics", [
  {
    $lookup: {
      from: "courses",
      localField: "courseId",
      foreignField: "_id",
      as: "course",
    },
  },
  {
    $project: {
      name: 1,
      desc: 1,
      courseId: 1,
      courseName: "$course.name",
      courseDesc: "$course.desc",
    },
  },
  { $unwind: "$courseName" },
  { $unwind: "$courseDesc" },
]);

db.createView("courseTopicsView", "topics", [
  {
    $lookup: {
      from: "courses",
      localField: "courseId",
      foreignField: "_id",
      as: "course",
    },
  },
  {
    $project: {
      _id: 1,
      courseId: 1,
      courseName: "$course.name",
      courseDesc: "$course.desc",
      courseImg: "$course.imgUrl",
    },
  },
  { $unwind: "$courseName" },
  { $unwind: "$courseDesc" },
  { $unwind: "$courseImg" },
]);

db.courseTopicsView.aggregate([
  {
    $match: { _id: ObjectId("67ffbeecc17cec304e9d78e6") },
  },
  {
    $group: {
      _id: {
        courseId: "$courseId",
        courseName: "$courseName",
        courseDesc: "$courseDesc",
      },
    },
  },
]);

db.courseTopics.distinct("course");

db.courseTopics.aggregate([
  {
    $group: {
      _id: {
        courseId: "$course._id",
        courseName: "$course.name",
      },
    },
  },
]);

db.createView("courseTopics", "courses", [
  {
    $lookup: {
      from: "topics",
      localField: "_id",
      foreignField: "courseId",
      as: "topics",
    },
  },
  {
    $project: { _id: 0 },
  },
]);

db.courseTopics.find();

db.courseTopics.find(
  { active: true, "topics._id": ObjectId("67fab2d398049867d09b756f") },
  { _id: 1, name: 1 }
);

db.topics.aggregate(
  { $match: { _id: ObjectId("67fc04c660de2fc19c8c1603") } },
  {
    $lookup: {
      from: "courses",
      localField: "courseId",
      foreignField: "_id",
      as: "course",
    },
  },
  {
    $project: { "course._id": 1, "course.name": 1 },
  }
);

db.topics.aggregate(
  {
    $match: {
      _id: {
        $in: [
          ObjectId("67fc04c660de2fc19c8c1603"),
          ObjectId("67f5597af6682728fa17777a"),
        ],
      },
    },
  },
  {
    $lookup: {
      from: "courses",
      localField: "courseId",
      foreignField: "_id",
      as: "course",
    },
  }
);

// '67fc045a60de2fc19c8c15fd',
//       '67fc04c660de2fc19c8c1603',
//       '67fc051d60de2fc19c8c160b',
//       '67fc05bc60de2fc19c8c1613',
//       '67fc034c60de2fc19c8c15ed',
//       '67fc037d60de2fc19c8c15f3',
//       '67fc057860de2fc19c8c1610',

db.topics.aggregate(
  {
    $match: {
      _id: {
        $in: [
          ObjectId("67fc034c60de2fc19c8c15ed"),
          ObjectId("67fc037d60de2fc19c8c15f3"),
        ],
        "course._id": ObjectId("67f29f0bbbbd0403564abf74"),
      },
    },
  },
  {
    $lookup: {
      from: "courses",
      localField: "courseId",
      foreignField: "_id",
      as: "course",
    },
  }
);

db.topics.aggregate(
  {
    $lookup: {
      from: "courses",
      localField: "courseId",
      foreignField: "_id",
      as: "course",
    },
  },
  {
    $match: {
      "course._id": ObjectId("67f29f0bbbbd0403564abf74"),
      _id: {
        $in: [
          ObjectId("67fc034c60de2fc19c8c15ed"),
          ObjectId("67fc037d60de2fc19c8c15f3"),
        ],
      },
    },
  }
);

db.topics.aggregate(
  {
    $match: {
      _id: {
        $in: [
          ObjectId("67fc034c60de2fc19c8c15ed"),
          ObjectId("67fc037d60de2fc19c8c15f3"),
        ],
      },
    },
  },
  {
    $lookup: {
      from: "courses",
      localField: "courseId",
      foreignField: "_id",
      as: "course",
    },
  }
);

db.courseTopicsView.find({
  _id: {
    $in: [
      ObjectId("67fc034c60de2fc19c8c15ed"),
      ObjectId("67fc037d60de2fc19c8c15f3"),
      ObjectId("67fc045a60de2fc19c8c15fd"),
      ObjectId("67fc04c660de2fc19c8c1603"),
      ObjectId("67fc051d60de2fc19c8c160b"),
      ObjectId("67fc057860de2fc19c8c1610"),
      ObjectId("67fc05bc60de2fc19c8c1613"),
    ],
  },
});

db.courseTopicsView.find({
  courseId: ObjectId("67fab0b498049867d09b7562"),
});
