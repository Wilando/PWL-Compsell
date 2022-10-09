'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Spesifikasi extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      this.belongsTo(models.JenisSpesifikasi, {foreignKey: 'id_jenis_spesifikasi'});
    }
  }
  Spesifikasi.init({
    id_jenis_spesifikasi: DataTypes.INTEGER,
    nama_spesifikasi: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Spesifikasi',
  });
  return Spesifikasi;
};