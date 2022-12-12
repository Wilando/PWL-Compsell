// import model
const { Brand } = require('../../../models');


module.exports = {

  allData: (req, res) => {
    Brand.allData()
      .then((brands) => res.json(brands))
      .catch((err) => res.json(err));
  },

  dataBrandBySlug: (req, res) => {
    Brand.dataBySlug(req.params.slug)
      .then((brand) => res.json(brand))
      .catch((err) => res.json(err));
  },

  tambahBrand: (req, res) => {
  	const file = req.file;
    if (!file) {
      return res.status(400).send({
        status: false,
        data: "File Belum Dicantumkan",
      });
    }
    else{
	    Brand.tambah(req.body, file.filename)
        .then((brand) => res.json({ message: `Brand ${brand.nama_brand} berhasil ditambahkan` }))
        .catch((err) => res.json(err));    
    }  
  },

  hapusBrand: (req, res) => {
    
    Brand.hapus(req.params.slug)
      .then(() => {
        return res.json({ msg: 'Brand berhasil dihapus' })
      })
      .catch((err) => res.json(err));
          
  },

  ubahBrand: (req, res) => {
    const file = req.file;
    if (!file) {
      Brand.ubah(req.body, undefined, req.params.slug)
        .then(() => res.json({ msg: 'Update Brand berhasil' }))
        .catch((err) => res.json(err));
    }
    else{
      Brand.ubah(req.body, file.filename, req.params.slug)
        .then(() => res.json({ msg: 'Update Brand berhasil' }))
        .catch((err) => res.json(err));
    }
    
  },

  downloadGambar: (req, res) => {
    const file = path.join(__dirname, `../../file/logo_brand/${req.params.gambarKategori}`);
    return res.download(file);
  },

};