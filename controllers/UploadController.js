exports.handleUpload = (req, res) => {
  if (!req.file) {
    return res.status(400).json({ message: "Tidak ada file yang diupload" });
  }

  return res.status(200).json({
    message: "File berhasil diupload.",
    filename: req.file.filename,
    path: req.file.path,
  });
};
