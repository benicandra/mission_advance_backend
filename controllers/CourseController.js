const { Op } = require("sequelize");
const Course = require("../models/CourseModel");

exports.getList = async (req, res) => {
  try {
    const { topic, sortBy, search } = req.query;
    const whereClause = {};
    let orderClause = [["title", "ASC"]];

    if (topic) {
      whereClause.topic = topic;
    }
    if (search) {
      whereClause.title = {
        [Op.like]: `%${search}%`,
      };
    }
    if (sortBy === "price") {
      orderClause = [["price", "ASC"]];
    } else if (sortBy === "duration") {
      orderClause = [["duration", "DESC"]];
    }

    const courses = await Course.findAll({
      where: whereClause,
      order: orderClause,
    });

    return res.status(200).json({
      message: `Selamat datang, user ID ${req.user.id}! ${courses.length} kursus ditemukan.`,
      data: courses,
    });
  } catch (error) {
    console.error("Error saat mengambil daftar kursus:", error);
    return res.status(500).json({ message: "Gagal mengambil data kursus." });
  }
};
