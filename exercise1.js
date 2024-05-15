const mongoose = require("mongoose");

mongoose.connect("mongodb://localhost/mongo-exercises");

const CourseSchema = new mongoose.Schema({
  name: String,
  author: String,
  tags: [String],
  date: Date,
  isPublished: Boolean,
  price: Number,
});

const Course = mongoose.model("Course", CourseSchema);

async function getCourse() {
  return await Course.find({ isPublished: true, tags: "backend" })
    //   .sort('name') // Ascending
    //   .sort('-name') // Descending
    .sort({ name: 1 })
    // .select('name author')
    .select({ name: 1, author: 1 });
}

async function run() {
  const courses = await getCourse();
  console.log(courses);
}

run();
