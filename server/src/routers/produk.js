const router = require('express').Router();
const { produk } = require('../controllers');

const { uploadGambarKategori } = require('../lib/multerConfig');

//endpoint Kategori
router.post('/tambah_kategori', uploadGambarKategori.single("gambarKategori"), produk.kategori.tambahKategori);
router.get('/data_kategori_pagination', produk.kategori.dataKategoriPagination);
router.get('/data_kategori_all', produk.kategori.dataKategoriAll);
router.get('/data_kategori_by_slug/:slug', produk.kategori.dataKategoriBySlug);
router.delete('/hapus_kategori/:slug', produk.kategori.hapusKategori);
router.put('/update_kategori/:slug', uploadGambarKategori.single("gambarKategori"), produk.kategori.ubahKategori);


//endpoint Sub Kategori
router.post('/tambah_sub_kategori', produk.kategori.tambahSubKategori);
router.delete('/hapus_sub_kategori/:slug', produk.kategori.hapusSubKategori);
router.get('/data_sub_kategori_by_slug/:slug', produk.kategori.dataSubKategoriBySlug);
router.put('/update_sub_kategori/:slug', produk.kategori.ubahSubKategori);

//brand

module.exports = router;