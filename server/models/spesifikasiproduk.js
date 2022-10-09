'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class SpesifikasiProduk extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      this.belongsTo(models.Produk, {foreignKey: 'id_produk'});
      this.hasMany(models.DetailSpesifikasiProduk, {foreignKey: 'id_spesifikasi_produk'});
    }
  }
  SpesifikasiProduk.init({
    id_produk: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'SpesifikasiProduk',
  });
  return SpesifikasiProduk;
};