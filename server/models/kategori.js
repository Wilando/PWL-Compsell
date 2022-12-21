'use strict';
const {
  Model, Op
} = require('sequelize');

const SequelizeSlugify = require('sequelize-slugify');
const { getPagination, getPagingData } = require('../src/utils/pagination');
const fs = require('fs-extra');
const path = require("path");
const _ = require("lodash");

module.exports = (sequelize, DataTypes) => {
  class Kategori extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      this.hasMany(models.Produk, {foreignKey: 'id_kategori'});
      this.hasMany(models.SubKategori, {foreignKey: 'id_kategori'});
    }

    //fungsi fetch data dengan pencarian dan pagination
    static data(query){
      const { page, size, filter } = query;
      
      const { limit, offset } = getPagination(page, size);
      
      const value = {
        [Op.iLike]: "%" + filter + "%"
      }
      // let condition = filter ? { filter: { [Op.iLike]: `%${filter}%` } } : null;
      const fields = Object.keys(
          _.omit(this.rawAttributes, [
              "createdAt",
              "updatedAt",
              "gambar_kategori",
              "id",
          ])
      );

      const filters ={};

      if(filter){
        fields.forEach((item) => (filters[item] = value));  
      }
      else{
        return this.findAndCountAll({  
          include: [{model: sequelize.models.SubKategori, attributes: { exclude: ['id','id_kategori'] }}],
          distinct: true,
          order: [["createdAt", "DESC"]], 
          limit, 
          offset 
        })
          .then(data => {
            const response = getPagingData(data, page, limit);
            return response;
          })        
      }

      return this.findAndCountAll({ 
        where: {[Op.or]:filters}, 
        include: [{model: sequelize.models.SubKategori, attributes: { exclude: ['id','id_kategori'] }}],
        distinct: true,
        order: [["createdAt", "DESC"]], 
        limit, 
        offset 
      })
        .then(data => {
          const response = getPagingData(data, page, limit);
          return response;
        })
    }

    // fungsi untuk mengambil data surat masuk berdasarkan slug
    static dataById(slug) {
      return this.findOne({ where: { slug }, include: "SubKategoris" });
    }

    //fungsi tambah
    static tambah({namaKategori, subKategori}, fileName){
      
      if (subKategori == undefined || subKategori.length == 0 ) {
        return this.create({nama_kategori: namaKategori, gambar_kategori: fileName})
      }
      else {
        return this.create({
          nama_kategori: namaKategori,
          gambar_kategori: fileName,
          SubKategoris: subKategori
        }, {
          include: [{
            association: "SubKategoris",
            as: 'SubKategoris'
          }]
        })
      }

      
    }

    //fungsi ubah
    static ubah({namaKategori}, fileName, slug){
      if (!fileName) {  
        return this.update({nama_kategori: namaKategori},{ where : {slug} });
      }
      else{
        return this.findOne({ where: { slug } })
          .then((kategori) => {
            fs.remove(path.join(__dirname, `../src/file/gambar_kategori/${kategori.gambar_kategori}`))
              .then(()=>{
                return this.update({nama_kategori: namaKategori, gambar_kategori: fileName},{ where : {slug} });
              })
          })
      }
      
    }

    // fungsi untuk delete
    static hapus(slug) {

      return this.findOne({ where: { slug } })
      .then((kategori) => {
        fs.remove(path.join(__dirname, `../src/file/gambar_kategori/${kategori.gambar_kategori}`))
          .then(()=>{
            return this.destroy({ where: { slug } });
          })
      })

    }

  }
  Kategori.init({
    nama_kategori: DataTypes.STRING,
    slug: DataTypes.STRING,
    gambar_kategori: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Kategori',
  });

  SequelizeSlugify.slugifyModel(Kategori, {
    source: ['nama_kategori'],
    overwrite: true,
    passTransaction: true,
    column: 'slug',
    bulkUpdate: true
  });

  return Kategori;
};