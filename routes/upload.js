const express = require("express");
const router = express.Router();
const uploadController = require("../controllers/UploadController");
const { uploadImage } = require("../services/uploadService");

router.post("/upload", uploadImage, uploadController.handleUpload);

module.exports = router;
