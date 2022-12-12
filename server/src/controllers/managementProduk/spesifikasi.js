// import model
const { DetailSpesifikasiProduk, JenisSpesifikasi, Spesifikasi, SpesifikasiProduk } = require('../../../models');

module.exports = {

	// ------------- Jenis Spesifikasi ---------------------------------------
	dataJenisSpesifikasiAll: (req, res) => {
	    JenisSpesifikasi.findAll({include: [{model: Spesifikasi, required: false}], order: [["id", "DESC"]] })
	      .then((jenis) => res.json(jenis))
	      .catch((err) => res.json(err));
  	},

  	dataJenisSpesifikasiById: (req, res) => {
	    JenisSpesifikasi.findOne({ where: { id: req.params.id }, include: [{model: Spesifikasi}] })
	      .then((jenis) => res.json(jenis))
	      .catch((err) => res.json(err));
	},

	tambahJenisSpesifikasi: (req, res) => {	
	    JenisSpesifikasi.tambah(req.body)
	        .then((jenis) => res.json(jenis))
	        .catch((err) => res.json(err));      
	},

	ubahJenisSpesifikasi: (req, res) => {
        Kategori.ubah(req.body, req.params.id)
          .then(() => res.json({ msg: 'Update Jenis Spesifikasi berhasil' }))
          .catch((err) => res.json(err));
  },

};