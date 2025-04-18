db.topics.aggregate([
  // Lookup customer info
  {
    $lookup: {
      from: "courses",
      localField: "courseId",
      foreignField: "_id",
      as: "course",
    },
  },
  {
    $unwind: "$course",
  },

  // Lookup product info
  {
    $lookup: {
      from: "products",
      localField: "productId",
      foreignField: "_id",
      as: "product",
    },
  },
  {
    $unwind: "$product",
  },

  // Lookup payment info
  {
    $lookup: {
      from: "payments",
      localField: "paymentId",
      foreignField: "_id",
      as: "payment",
    },
  },
  {
    $unwind: "$payment",
  },
]);

//////////////

db.topics.aggregate([
  {
    $lookup: {
      from: "courses",
      localField: "courseId",
      foreignField: "_id",
      as: "course",
    },
  },
  {
    $unwind: "$course",
  },
]);

////////////////

db.topics.aggregate([
  {
    $lookup: {
      from: "courses",
      localField: "courseId",
      foreignField: "_id",
      as: "course",
    },
  },
  {
    $unwind: "$course",
  },
]);

////////////////

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


/////////////////////

db.courses.aggregate([
  {
    $group: {
      _id: null,
      name: '$name' 
    }
  },
  {
    $project: { _id: 0, name: 1 }
  },
  {
    $lookup: {
      from: "topics",
      localField: "_id",
      foreignField: "courseId",
      as: "topic",
    },
  },
  {
    $unwind: "$topic",
  },
]);


/////////////////////////////

db.courses.aggregate([
  {
    $lookup: {
      from: 'topics',
      let: { topicId: '$_id' }, // define variable
      pipeline: [
        { $match: { $expr: { $eq: ['$topicId', '$$topicId'] } } }, // subquery-like match
        { $sort: { createdAt: -1 } },
        { $limit: 1 }
      ],
      as: 'latestOrder'
    }
  },
  {
    $unwind: {
      path: '$latestOrder',
      preserveNullAndEmptyArrays: true
    }
  }
])
