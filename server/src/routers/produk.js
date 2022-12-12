const router = require('express').Router();
const { managementProduk } = require('../controllers');

const { uploadGambarKategori, uploadLogoBrand } = require('../lib/multerConfig');

//endpoint Kategori
router.post('/tambah_kategori', uploadGambarKategori.single("gambarKategori"), managementProduk.kategori.tambahKategori);
router.get('/data_kategori_pagination', managementProduk.kategori.dataKategoriPagination);
router.get('/data_kategori_all', managementProduk.kategori.dataKategoriAll);
router.get('/data_kategori_by_slug/:slug', managementProduk.kategori.dataKategoriBySlug);
router.delete('/hapus_kategori/:slug', managementProduk.kategori.hapusKategori);
router.put('/update_kategori/:slug', uploadGambarKategori.single("gambarKategori"), managementProduk.kategori.ubahKategori);


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

//jenis dan template spesifikasi
router.post('/tambah_jenis_spesifikasi', managementProduk.spesifikasi.tambahJenisSpesifikasi);
router.get('/all_data_jenis_spesifikasi', managementProduk.spesifikasi.dataJenisSpesifikasiAll);
router.get('/data_jenis_spesifikasi_by_id/:id', managementProduk.spesifikasi.dataJenisSpesifikasiById);
router.put('/update_jenis_spesifikasi/:id', managementProduk.spesifikasi.ubahJenisSpesifikasi);


module.exports = router;