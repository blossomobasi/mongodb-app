const mongoose = require("mongoose");
mongoose
  .connect("mongodb://localhost/playground")
  .then(() => console.log("Connected to MongoDB..."))
  .catch((err) => console.error("Could not connect to MongoDb...", err));

const courseSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    minlength: 5,
    maxlength: 255,
  },
  category: {
    type: String,
    required: true,
    enum: ["web", "mobile", "network"],
    lowercase: true,
    // uppercase: true
    trim: true,
  },
  author: String,
  // tags: [String],
  tags: {
    type: Array,
    validate: {
      validator: function (v) {
        return v && v.length > 0;
      },
      message: "A course should have at least on tag.",
    },

    // Async validation
    // validate: {
    //   isAsync: true,
    //   validator: function (v, callback) {
    //     setTimeout(() => {
    //       const result = v && v.length > 0;
    //       callback(result);
    //     }, 4000);
    //   },
    //   message: "A course should have at least one tag.",
    // },
  },
  date: { type: Date, default: Date.now },
  isPublished: Boolean,
  price: {
    type: Number,
    required: function () {
      return this.isPublished;
    },
    min: 10,
    max: 200,
    get: (v) => Math.round(v),
    set: (v) => Math.round(v),
  },
});

const Course = mongoose.model("Course", courseSchema);

async function createCourse() {
  const course = new Course({
    name: "Angular Course",
    author: "Blossom",
    category: "Web",
    // tags: ["angular", "frontend"],
    tags: ["frontend"],
    isPublished: true,
    price: 15.8,
  });
  try {
    const result = await course.save();
    console.log(result);
  } catch (ex) {
    for (field in ex.errors) {
      console.log(ex.errors[field].message);
    }
  }
}

async function getCourse() {
  const pageNumber = 2;
  const pageSize = 10;

  // Comparison operators in mongodb
  // eq (equal)
  // gt (greater than)
  // gte (greater than or equal to)
  // lt (less than)
  // lte (less than or equal to)
  // in
  // nin (not in)

  // Logical Operators

  const courses = await Course

    // .find({ price: { $gt: 10, $lte: 20 } })
    // .find({ price: { $in: [10, 15, 20] } })
    // .find()
    // .or([{ author: "Blossom" }, { isPublished: true }]) // Get courses authored by 'Blossom' or courses that is published
    // .and([ ])

    // Starts with Blossom
    // .find({ author: /^Blossom/ }) // case sensitive

    // Ends with Obasi
    // .find({ author: /Obasi$/i }) // case insensitive

    // Contains Blossom
    // .find({ author: /.*Blossom.*/ })

    .find({
      author: "Blossom",
      isPublished: true,
    })
    .skip((pageNumber - 1) * pageSize)
    .limit(pageSize)
    // .limit(10)
    .sort({ name: 1 });
  // .select({ name: 1, tags: 1 });
  // .count();
  console.log(courses);
}

async function updateCourse(id) {
  // Update a course
  // const course = await Course.findById(id);
  // if (!course) return console.log("This course does not exist");
  // // course.set({
  // //   isPublished: true,
  // //   author: "Another Author",
  // // });
  // course.isPublished = true;
  // course.author = "Another Author";
  // const result = await course.save();
  // console.log(result);
  // Update directly
  // const result = await Course.update(
  //   { _id: id },
  //   {
  //     $set: {
  //       author: "Blossom",
  //       isPublished: false,
  //     },
  //   }
  // );
  // console.log(result);
  // get document of what was updated
  // const course = await Course.findByIdAndUpdate(
  //   id,
  //   {
  //     $set: {
  //       author: "Dalington",
  //       isPublished: false,
  //     },
  //   },
  //   { new: true }
  // );
  // console.log(course);

  //  get document of what was updated
  const course = await Course.findByIdAndUpdate(
    id,
    {
      $set: {
        author: "Dalington",
        isPublished: false,
      },
    },
    { new: true }
  );
  console.log(course);
}

async function removeCourse(id) {
  // Delete one
  // const result = await Course.deleteOne({ _id: id });
  // console.log(result);

  // Delete many
  // const result = await Course.deleteMany({_id: id});

  // Get document that was deleted
  const course = await Course.findByIdAndRemove(id);
  console.log(course);
}

// removeCourse("66437889b9db3929bcd9fa4b");
createCourse();
