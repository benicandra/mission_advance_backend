const nodemailer = require("nodemailer");
require("dotenv").config();

const transporter = nodemailer.createTransport({
  host: process.env.EMAIL_HOST,
  port: process.env.EMAIL_PORT,
  secure: false,
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

exports.sendVerificationEmail = async (userEmail, token) => {
  const verificationLink = `${process.env.APP_BASE_URL}api/auth/verify-email?token=${token}`;

  const mailOptions = {
    from: `"EduCourse Admin" <noreply@educourse.com>`,
    to: userEmail,
    subject: "Verifikasi Akun Educourse Anda",
    html: `
    <h1>Verifikasi Akun</h1>
    <p>Klik link di bawah ini untuk verifikasi:</p>
    <a href="${verificationLink}">${verificationLink}</a>
    `,
  };

  try {
    await transporter.sendMail(mailOptions);
    console.log(
      `Email verifikasi berhasil dikirim ke ${userEmail} (via Mailtrap).`
    );
  } catch (error) {
    console.error("Gagal mengirim email verifikasi:", error);
  }
};
