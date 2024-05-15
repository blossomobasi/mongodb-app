const mongoose = require("mongoose");
mongoose
  .connect("mongodb://localhost/playground")
  .then(() => console.log("Connected to MongoDB..."))
  .catch((err) => console.error("Could not connect to MongoDb...", err));

const courseSchema = new mongoose.Schema({
  name: String,
  author: String,
  tags: [String],
  date: { type: Date, default: Date.now },
  isPublished: Boolean,
});

const Course = mongoose.model("Course", courseSchema);

async function createCourse() {
  const course = new Course({
    name: "Angular Course",
    author: "Blossom",
    tags: ["angular", "frontend"],
    isPublished: true,
  });

  const result = await course.save();
  console.log(result);
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
    .sort({ name: 1 })
    // .select({ name: 1, tags: 1 });
    .count();
  console.log(courses);
}

async function updateCourse(id) {
  // Approach: Query first
  // findById()
  // Modify its properties
  // save()
  const course = await Course.findById(id);
  if (!course) return console.log("This course does not exist");
  // course.set({
  //   isPublished: true,
  //   author: "Another Author",
  // });

  course.isPublished = true;
  course.author = "Another Author";
  const result = await course.save();
  console.log(result);
}

updateCourse("66437889b9db3929bcd9fa4b");
