require("dotenv").config();

const { Sequelize } = require("sequelize");

const sequelize = new Sequelize(
  process.env.DB_NAME,
  process.env.DB_USER,
  process.env.DB_PASSWORD,
  {
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    dialect: process.env.DB_DIALECT,
  }
);

if (require.main === module) {
  sequelize
    .authenticate()
    .then(() => {
      console.log("Koneksi database (Sequelize) berhasil.");
      process.exit(0);
    })
    .catch((error) => {
      console.error("Gagal koneksi database:", error.message);
      process.exit(1);
    });
} else {
  module.exports = sequelize;
}
