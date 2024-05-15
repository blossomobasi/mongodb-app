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
  return await Course.find({
    isPublished: true,
    // tags: { $in: ["frontend", "backend"] },
  })
    .or([{ tags: "frontend" }, { tags: "backend" }])
    .sort("-price")
    .select("name author price");
}

async function run() {
  const courses = await getCourse();
  console.log(courses);
}

run();
