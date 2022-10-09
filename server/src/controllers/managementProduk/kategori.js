// import model
const { Kategori, SubKategori } = require('../../../models');


module.exports = {

  dataKategoriAll: (req, res) => {
    Kategori.findAll()
      .then((kategoris) => res.json(kategoris))
      .catch((err) => res.json(err));
  },

  dataKategoriPagination: (req, res) => {
    Kategori.data(req.query)
      .then((kategoris) => res.json(kategoris))
      .catch((err) => res.json(err));
  },

  dataKategoriBySlug: (req, res) => {
    Kategori.dataById(req.params.slug)
      .then((kategori) => res.json(kategori))
      .catch((err) => res.json(err));
  },

  tambahKategori: (req, res) => {
  	const file = req.file;
    if (!file) {
      return res.status(400).send({
        status: false,
        data: "File Belum Dicantumkan",
      });
    }
    else{
	    Kategori.tambah(req.body, file.filename)
        .then((kategori) => res.json({ message: `Kategori ${kategori.nama_kategori} berhasil ditambahkan` }))
        .catch((err) => res.json(err));    
    }  
  },

  hapusKategori: (req, res) => {
    
    Kategori.hapus(req.params.slug)
      .then(() => {
        return res.json({ msg: 'Kategori berhasil dihapus' })
      })
      .catch((err) => res.json(err));
          
  },

  ubahKategori: (req, res) => {
    const file = req.file;
    if (!file) {
      Kategori.ubah(req.body, undefined, req.params.slug)
        .then(() => res.json({ msg: 'Update Kategori berhasil' }))
        .catch((err) => res.json(err));
    }
    else{
      Kategori.ubah(req.body, file.filename, req.params.slug)
        .then(() => res.json({ msg: 'Update Kategori berhasil' }))
        .catch((err) => res.json(err));
    }
    
  },

  downloadGambar: (req, res) => {
    const file = path.join(__dirname, `../../file/gambar_kategori/${req.params.gambarKategori}`);
    return res.download(file);
  },

  tambahSubKategori: (req, res) => {
    SubKategori.tambah(req.body)
        .then((subKategori) => res.json({ message: `Sub Kategori ${subKategori.nama_sub_kategori} berhasil ditambahkan` }))
        .catch((err) => res.json(err)); 
  },

  hapusSubKategori: (req, res) => {
    SubKategori.hapus(req.params.slug)
      .then(() => {
        return res.json({ msg: 'Sub Kategori berhasil dihapus' })
      })
      .catch((err) => res.json(err));
  },

  ubahSubKategori: (req, res) => {
    SubKategori.ubah(req.body, req.params.slug)
      .then(() => res.json({ msg: 'Update Sub Kategori Berhasil' }))
      .catch((err) => res.json(err));
    
  },

  dataSubKategoriBySlug: (req, res) => {
    SubKategori.dataBySlug(req.params.slug)
      .then((subKategori) => res.json(subKategori))
      .catch((err) => res.json(err));
  },

};