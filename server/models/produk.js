'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Produk extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      this.belongsTo(models.Kategori, {foreignKey: 'id_kategori'});
      this.hasOne(models.SpesifikasiProduk, {foreignKey: 'id_spesifikasi_produk'});
      this.belongsTo(models.SubKategori, {foreignKey: 'id_sub_kategori'});
      this.belongsTo(models.Brand, {foreignKey: 'id_brand'});
    }
  }
  Produk.init({
    id_kategori: DataTypes.INTEGER,
    id_sub_kategori: DataTypes.INTEGER,
    id_brand: DataTypes.INTEGER,
    nama_produk: DataTypes.STRING,
    gambar_produk: DataTypes.STRING,
    harga: DataTypes.INTEGER,
    stok: DataTypes.INTEGER,
  }, {
    sequelize,
    modelName: 'Produk',
  });
  return Produk;
};