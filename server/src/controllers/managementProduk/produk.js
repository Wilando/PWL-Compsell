// import model
const { Produk } = require('../../../models');
const path = require("path");

module.exports = {
  
  allData: (req, res) => {
    Produk.data(req.query)
      .then((produks) => res.json(produks))
      .catch((err) => res.json(err));
  },

  tambahProduk: (req, res) => {
  	const file = req.file;
    if (!file) {
      return res.status(400).send({
        status: false,
        data: "File Belum Dicantumkan",
      });
    }
    else{
	    Produk.tambah(req.body, file.filename)
        .then((produk) => res.json({ message: `Produk ${produk.nama_produk} berhasil ditambahkan` }))
        .catch((err) => res.json(err));    
    }  
  },

  ubahProduk: (req, res) => {
    const file = req.file;
    if (!file) {
      Produk.ubah(req.body, undefined, req.params.id)
        .then(() => res.json({ msg: 'Update Produk berhasil' }))
        .catch((err) => res.json(err));
    }
    else{
      Produk.ubah(req.body, file.filename, req.params.id)
        .then(() => res.json({ msg: 'Update Produk berhasil' }))
        .catch((err) => res.json(err));
    }
    
  },

  dataProdukById: (req, res) => {
    Produk.dataById(req.params.id)
      .then((produk) => res.json(produk))
      .catch((err) => res.json(err));
  },

  hapusProduk: (req, res) => {
    
    Produk.hapus(req.params.id)
      .then(() => {
        return res.json({ msg: 'Produk berhasil dihapus' })
      })
      .catch((err) => res.json(err));
          
  },

  downloadGambar: (req, res) => {
    const file = path.join(__dirname, `../../file/gambar_produk/${req.params.file}`);
    return res.download(file);
  },

}