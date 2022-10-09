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
      this.hasMany(models.Spesifikasi, {foreignKey: 'id_spesifikasi'})
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