'use strict';
const {
  Model
} = require('sequelize');

const SequelizeSlugify = require('sequelize-slugify');

module.exports = (sequelize, DataTypes) => {
  class SubKategori extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      this.belongsTo(models.Kategori, {foreignKey: 'id_kategori'});
      this.hasOne(models.Produk, {foreignKey: 'id_kategori'});
    }

    static tambah({namaSubKategori, idKategori}){
      return this.create({ id_kategori: idKategori ,nama_sub_kategori: namaSubKategori });
    }

    static ubah({namaSubKategori}, slug){
      return this.update( {nama_sub_kategori: namaSubKategori}, { where : {slug} } );
    }

    static hapus(slug){
      return this.destroy({ where: { slug } });
    }

    static dataBySlug(slug) {
      return this.findOne({ where: { slug }, attributes: { exclude: ['id'] } });
    }

  }
  SubKategori.init({
    slug: DataTypes.STRING,
    id_kategori: DataTypes.STRING,
    nama_sub_kategori: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'SubKategori',
  });

  SequelizeSlugify.slugifyModel(SubKategori, {
    source: ['nama_sub_kategori'],
    overwrite: true,
    passTransaction: true,
    column: 'slug',
    bulkUpdate: true
  });

  return SubKategori;
};