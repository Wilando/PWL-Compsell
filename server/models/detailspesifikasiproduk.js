'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class DetailSpesifikasiProduk extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      this.belongsTo(models.SpesifikasiProduk, {foreignKey: 'id_spesifikasi_produk'});
    }
  }
  DetailSpesifikasiProduk.init({
    id_spesifikasi_produk: DataTypes.INTEGER,
    nama_spesifikasi: DataTypes.STRING,
    isi_spesifikasi: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'DetailSpesifikasiProduk',
  });
  return DetailSpesifikasiProduk;
};