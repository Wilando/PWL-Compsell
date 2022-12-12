'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class JenisSpesifikasi extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      this.hasMany(models.Spesifikasi, {foreignKey: 'id_jenis_spesifikasi'})
    }

    static tambah({namaJenisSpesifikasi, spesifikasi}){
      return this.create({
        nama_jenis_spesifikasi: namaJenisSpesifikasi,
        Spesifikasis: spesifikasi
      }, {
        include: [{
          association: "Spesifikasis",
          as: 'Spesifikasis'
        }]
      })
      
    }

    static ubah({namaJenisSpesifikasi}, id){
      return this.update({nama_kategori: namaKategori},{ where : {id} });
    }

    static hapus(id) {
      return this.destroy({ where: { id } });      
    }

  }
  JenisSpesifikasi.init({
    nama_jenis_spesifikasi: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'JenisSpesifikasi',
  });
  return JenisSpesifikasi;
};