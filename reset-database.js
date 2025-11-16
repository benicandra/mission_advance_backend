const sequelize = require("./config/db.config");
const User = require("./models/User");
const Course = require("./models/CourseModel");

async function resetDatabase() {
  try {
    console.log("Starting database reset...");

    // Drop dan recreate tabel
    await sequelize.sync({ force: true });

    console.log("Database berhasil di-reset!");

    // Insert sample courses
    await Course.bulkCreate([
      {
        title: "JavaScript Fundamental",
        topic: "JavaScript",
        duration: 40,
        price: 299000,
      },
      {
        title: "React.js Complete Guide",
        topic: "React",
        duration: 60,
        price: 499000,
      },
      {
        title: "Node.js Backend Development",
        topic: "Node.js",
        duration: 50,
        price: 399000,
      },
      {
        title: "Vue.js for Beginners",
        topic: "Vue.js",
        duration: 35,
        price: 249000,
      },
      {
        title: "Python Programming",
        topic: "Python",
        duration: 45,
        price: 349000,
      },
    ]);

    console.log("Sample courses berhasil ditambahkan!");
    console.log("Total courses:", await Course.count());

    console.log("\n Database siap untuk testing!");
    console.log("Email verification: Check Mailtrap untuk token");
    console.log("Test user: Register baru untuk testing");
  } catch (error) {
    console.error("Error saat reset database:", error);
  } finally {
    await sequelize.close();
    process.exit(0);
  }
}

resetDatabase();
