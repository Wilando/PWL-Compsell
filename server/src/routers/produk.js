const router = require('express').Router();
const { managementProduk } = require('../controllers');

const { uploadGambarKategori, uploadLogoBrand, uploadGambarProduk } = require('../lib/multerConfig');

//endpoint Kategori
router.post('/tambah_kategori', uploadGambarKategori.single("gambarKategori"), managementProduk.kategori.tambahKategori);
router.get('/data_kategori_pagination', managementProduk.kategori.dataKategoriPagination);
router.get('/data_kategori_all', managementProduk.kategori.dataKategoriAll);
router.get('/data_kategori_by_slug/:slug', managementProduk.kategori.dataKategoriBySlug);
router.delete('/hapus_kategori/:slug', managementProduk.kategori.hapusKategori);
router.put('/update_kategori/:slug', uploadGambarKategori.single("gambarKategori"), managementProduk.kategori.ubahKategori);
router.get('/gambar_kategori/:file', managementProduk.kategori.downloadGambar);

//endpoint Sub Kategori
router.post('/tambah_sub_kategori', managementProduk.kategori.tambahSubKategori);
router.delete('/hapus_sub_kategori/:slug', managementProduk.kategori.hapusSubKategori);
router.get('/data_sub_kategori_by_slug/:slug', managementProduk.kategori.dataSubKategoriBySlug);
router.put('/update_sub_kategori/:slug', managementProduk.kategori.ubahSubKategori);

//brand
router.post('/tambah_brand', uploadLogoBrand.single("logoBrand"), managementProduk.brand.tambahBrand);
router.get('/all_data_brand', managementProduk.brand.allData);
router.get('/data_brand_by_slug/:slug', managementProduk.brand.dataBrandBySlug);
router.delete('/hapus_brand/:slug', managementProduk.brand.hapusBrand);
router.put('/update_brand/:slug', uploadLogoBrand.single("logoBrand"), managementProduk.brand.ubahBrand);
router.get('/gambar_brand/:file', managementProduk.brand.downloadGambar);
router.get('/no_data_brand', managementProduk.brand.noPagination);

//produk
router.post('/tambah_produk', uploadGambarProduk.single("gambarProduk"), managementProduk.produk.tambahProduk);
router.get('/all_data_produk', managementProduk.produk.allData);
router.put('/update_produk/:id', uploadGambarProduk.single("gambarProduk"), managementProduk.produk.ubahProduk);
router.get('/data_produk_by_id/:id', managementProduk.produk.dataProdukById);
router.delete('/hapus_produk/:id', managementProduk.produk.hapusProduk);
router.get('/gambar_produk/:file', managementProduk.produk.downloadGambar);

module.exports = router;