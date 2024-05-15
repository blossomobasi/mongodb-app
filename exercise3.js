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
  })
    .or([{ price: { $gte: 15 } }, { name: /.*by.*/i }])
    // .gte({ price: 15 });
    .sort("-price")
    .select("name author price");
}

async function run() {
  const courses = await getCourse();
  console.log(courses);
}

run();
