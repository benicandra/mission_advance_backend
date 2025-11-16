const User = require("../models/User");
const bcrypt = require("bcrypt");
const { v4: uuidv4 } = require("uuid");
const { sendVerificationEmail } = require("../services/emailService");

const jwt = require("jsonwebtoken");
const JWT_SECRET = process.env.JWT_SECRET;
const JWT_EXPIRES_IN = process.env.JWT_EXPIRES_IN || "1d";

const saltRounds = 10;

const validateEmail = (email) => {
  const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return re.test(email);
};

const validatePassword = (password) => {
  return password && password.length >= 6;
};

exports.register = async (req, res) => {
  try {
    console.log("Register request received:", req.body);

    const { fullname, username, email, password } = req.body;

    console.log("Validating input fields...");
    if (!fullname || !username || !email || !password) {
      console.log("Missing fields");
      return res.status(400).json({
        message: "Semua field harus diisi.",
      });
    }

    if (!validateEmail(email)) {
      console.log("Invalid email format");
      return res.status(400).json({
        message: "Format email tidak valid.",
      });
    }

    if (!validatePassword(password)) {
      console.log("Password too short");
      return res.status(400).json({
        message: "Password minimal 6 karakter.",
      });
    }

    if (username.length < 3) {
      console.log("Username too short");
      return res.status(400).json({
        message: "Username minimal 3 karakter.",
      });
    }

    console.log("Checking existing users...");
    const existingUser = await User.findOne({ where: { email } });
    if (existingUser) {
      console.log("Email already exists:", email);
      return res.status(409).json({ message: "Email sudah terdaftar." });
    }

    const existingUsername = await User.findOne({ where: { username } });
    if (existingUsername) {
      console.log("Username already exists:", username);
      return res.status(409).json({ message: "Username sudah digunakan." });
    }

    console.log("Hashing password...");
    const hashedPassword = await bcrypt.hash(password, saltRounds);
    const verificationToken = uuidv4();

    console.log("Creating new user...");
    const newUser = await User.create({
      fullname,
      username,
      email,
      password: hashedPassword,
      verification_token: verificationToken,
      is_verified: false,
    });

    console.log("User created successfully:", newUser.id);
    console.log("Sending verification email...");
    await sendVerificationEmail(newUser.email, verificationToken);

    return res.status(201).json({
      message: "Registrasi berhasil! Silakan cek email Anda untuk verifikasi.",
      user: {
        id: newUser.id,
        username: newUser.username,
        email: newUser.email,
      },
    });
  } catch (error) {
    console.error("❌ Error saat registrasi:", error);
    console.error("Stack trace:", error.stack);
    return res
      .status(500)
      .json({ message: "Registrasi gagal karena error server." });
  }
};

exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({
        message: "Email dan password harus diisi.",
      });
    }

    if (!validateEmail(email)) {
      return res.status(400).json({
        message: "Format email tidak valid.",
      });
    }

    const user = await User.findOne({ where: { email } });

    if (!user) {
      return res.status(401).json({ message: "Email atau Password salah." });
    }

    if (!user.is_verified) {
      return res
        .status(401)
        .json({ message: "Akun belum diverifikasi. Silahkan cek email." });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ message: "Email atau Password salah." });
    }

    const token = jwt.sign({ id: user.id, email: user.email }, JWT_SECRET, {
      expiresIn: JWT_EXPIRES_IN,
    });

    return res.status(200).json({
      message: "Login berhasil!",
      token: token,
      user: {
        id: user.id,
        username: user.username,
        email: user.email,
      },
    });
  } catch (error) {
    console.error("Error saat login:", error);
    return res
      .status(500)
      .json({ message: "Login gagal karena error server." });
  }
};

exports.verifyEmail = async (req, res) => {
  try {
    const { token } = req.query;

    if (!token) {
      return res
        .status(400)
        .json({ message: "Token verifikasi tidak ditemukan." });
    }

    const user = await User.findOne({ where: { verification_token: token } });

    if (!user) {
      return res.status(400).json({ message: "Token verifikasi tidak valid." });
    }

    if (user.is_verified) {
      return res.status(400).json({ message: "Akun sudah diverifikasi." });
    }

    await user.update({
      is_verified: true,
      verification_token: null,
    });

    return res.status(200).json({
      message: "Email berhasil diverifikasi! Silakan login.",
    });
  } catch (error) {
    console.error("Error saat verifikasi email:", error);
    return res
      .status(500)
      .json({ message: "Verifikasi email gagal karena error server." });
  }
};
