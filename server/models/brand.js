'use strict';
const {
  Model
} = require('sequelize');

const SequelizeSlugify = require('sequelize-slugify');
const fs = require('fs-extra');
const path = require("path");

module.exports = (sequelize, DataTypes) => {
  class Brand extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      this.hasMany(models.Produk, {foreignKey: 'id_brand'})
    }

    static tambah({namaBrand, deskripsiBrand}, fileName){
      return this.create({ nama_brand: namaBrand, deskripsi_brand: deskripsiBrand, logo_brand: fileName });
    }

    static ubah({namaBrand, deskripsiBrand}, fileName, slug){
      if (!fileName) {  
        return this.update({nama_brand: namaBrand, deskripsi_brand: deskripsiBrand},{ where : {slug} });
      }
      else{
        return this.findOne({ where: { slug } })
          .then((brand) => {
            fs.remove(path.join(__dirname, `../src/file/logo_brand/${brand.logo_brand}`))
              .then(()=>{
                return this.update({nama_brand: namaBrand, deskripsi_brand: deskripsiBrand, logo_brand: fileName},{ where : {slug} });
              })
          })
      }
      
    }

    static hapus(slug) {

      return this.findOne({ where: { slug } })
      .then((brand) => {
        fs.remove(path.join(__dirname, `../src/file/logo_brand/${brand.logo_brand}`))
          .then(()=>{
            return this.destroy({ where: { slug } });
          })
      })

    }

    static dataBySlug(slug) {
      return this.findOne({ where: { slug } });
    }

    static allData(){
      return this.findAll();
    }


  }
  Brand.init({
    slug: DataTypes.STRING,
    nama_brand: DataTypes.STRING,
    logo_brand: DataTypes.STRING,
    deskripsi_brand: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Brand',
  });

  SequelizeSlugify.slugifyModel(Brand, {
    source: ['nama_brand'],
    overwrite: true,
    passTransaction: true,
    column: 'slug',
    bulkUpdate: true
  });

  return Brand;
};