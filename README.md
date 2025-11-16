![Node.js](https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=node.js&logoColor=white)
![Express.js](https://img.shields.io/badge/Express.js-000000?style=for-the-badge&logo=express&logoColor=white)
![MySQL](https://img.shields.io/badge/MySQL-4479A1?style=for-the-badge&logo=mysql&logoColor=white)
![Sequelize](https://img.shields.io/badge/Sequelize-323330?style=for-the-badge&logo=sequelize&logoColor=blue)
![JWT](https://img.shields.io/badge/JWT-000000?style=for-the-badge&logo=JSON%20web%20tokens&logoColor=white)
![Multer](https://img.shields.io/badge/Multer-007BFF?style=for-the-badge&logo=multer&logoColor=white)
![Nodemailer](https://img.shields.io/badge/Nodemailer-00A4EF?style=for-the-badge&logo=nodemailer&logoColor=white)
![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black)

EduCourse API

  Backend RESTful API untuk platform edukasi online dengan Node.js, Express.js, dan MySQL.

  🚀 Fitur
   - 🔐 Autentikasi JWT dengan verifikasi email
   - 📚 Manajemen kursus dengan filtering & sorting
   - 📁 Upload file gambar dengan validasi
   - 🛡️ Password hashing & input validation

  🛠️ Tech Stack
  Node.js, Express.js, MySQL, Sequelize, JWT, Multer, Nodemailer

  ⚙️ Install

   1 npm install
   2 node reset-database.js
   3 npm start

  📡 Endpoints
   - POST /api/auth/register - Register user
   - POST /api/auth/login - Login
   - GET /api/auth/verify-email - Verifikasi email
   - GET /api/courses/ - List kursus (auth)
   - POST /api/upload/upload - Upload gambar (auth)

  🧪 Test
  Gunakan Postman atau file test-api.http untuk testing.

  ---
