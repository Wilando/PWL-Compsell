// multer
const multer = require("multer");
// path
const path = require("path");

const diskStorageGambarKategori = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, path.join(__dirname, "../file/gambar_kategori"));
  },
  // konfigurasi penamaan file yang unik
  filename: function (req, file, cb) {
    cb(
      null,
      file.originalname.split(".")[0] + "-" + Date.now() + path.extname(file.originalname)
    );
  },
});

const diskStorageLogoBrand = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, path.join(__dirname, "../file/logo_brand"));
  },
  // konfigurasi penamaan file yang unik
  filename: function (req, file, cb) {
    cb(
      null,
      file.originalname.split(".")[0] + "-" + Date.now() + path.extname(file.originalname)
    );
  },
});

const diskStorageGambarProduk = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, path.join(__dirname, "../file/gambar_produk"));
  },
  // konfigurasi penamaan file yang unik
  filename: function (req, file, cb) {
    cb(
      null,
      file.originalname.split(".")[0] + "-" + Date.now() + path.extname(file.originalname)
    );
  },
});

const multerFilterGambar = ({req, res}, file, cb) => {
  if (file.mimetype.split("/")[1] === "jpeg" || file.mimetype.split("/")[1] === "png" || file.mimetype.split("/")[1] === "gif" ) {
    cb(null, true);
  } else {
    cb(new Error("Bukan file Gambar!!"), false);
    return res.status(400).send({
      status: false,
      data: "File Bukan Gambar!!",
    });
  }
};

const uploadGambarProduk = multer({
  storage: diskStorageGambarProduk,
  fileFilter: multerFilterGambar,
});

const uploadGambarKategori = multer({
  storage: diskStorageGambarKategori,
  fileFilter: multerFilterGambar,
});

const uploadLogoBrand = multer({
  storage: diskStorageLogoBrand,
  fileFilter: multerFilterGambar,
});

module.exports = {
  uploadGambarKategori,
  uploadLogoBrand,
  uploadGambarProduk,
};