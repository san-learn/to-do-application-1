import mongoose from "mongoose";
import bcrypt from "bcryptjs";
import dotenv from "dotenv";

import { User } from "../models/user-model.js";
import { Todo } from "../models/todo-model.js";

import { connectToDatabase } from "./connect-to-database.js";
import { loggingWithTime } from "./logging-with-time.js";

dotenv.config();

async function seedDatabase() {
  await connectToDatabase();

  try {
    await User.deleteMany();

    await Todo.deleteMany();

    loggingWithTime(
      "Seeding database [status: started, cleared existing data]"
    );

    const users = await User.insertMany([
      {
        email: "teacher@mail.com",
        password: await bcrypt.hash("password123", 10),
      },
      {
        email: "doctor@mail.com",
        password: await bcrypt.hash("password123", 10),
      },
      {
        email: "programmer@mail.com",
        password: await bcrypt.hash("password123", 10),
      },
    ]);

    loggingWithTime("Seeding database [status: on progress, created users]");

    const todos = [];

    users.forEach((user) => {
      let tasks = [];

      if (user.email === "teacher@mail.com") {
        tasks = [
          "Prepare lesson plans",
          "Grade student assignments",
          "Prepare exams",
          "Teach morning classes",
          "Attend teacher meetings",
          "Help struggling students",
          "Update syllabus",
          "Manage extracurricular activities",
          "Write academic reports",
          "Prepare online learning materials",
        ];
      } else if (user.email === "doctor@mail.com") {
        tasks = [
          "Perform patient check-ups",
          "Write prescriptions",
          "Analyze lab results",
          "Attend medical meetings",
          "Manage patient consultation schedules",
          "Handle emergency cases",
          "Review patient medical history",
          "Consult with specialists",
          "Provide health education",
          "Conduct routine examinations",
        ];
      } else if (user.email === "programmer@mail.com") {
        tasks = [
          "Write new feature code",
          "Fix application bugs",
          "Conduct code reviews",
          "Update project documentation",
          "Attend stand-up meetings",
          "Optimize application performance",
          "Perform unit testing",
          "Deploy applications to server",
          "Adjust UI to match new designs",
          "Learn new technologies",
        ];
      }

      tasks.forEach((task) => {
        todos.push({
          userId: user._id,
          title: task,
          isCompleted: Math.random() > 0.5,
        });
      });
    });

    await Todo.insertMany(todos);

    loggingWithTime(
      "Seeding database [status: on progress, created tasks for each user]"
    );
    loggingWithTime("Seeding database [status: completed]");

    mongoose.connection.close();

    loggingWithTime("MongoDB [status: disconnected]");

    process.exit(1);
  } catch (error) {
    loggingWithTime(
      "Seeding database [status: failed] [error: " + error.message + "]"
    );

    mongoose.connection.close();

    process.exit(1);
  }
}

seedDatabase();
