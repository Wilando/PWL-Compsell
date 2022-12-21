'use strict';
const {
  Model, Op
} = require('sequelize');
  
const { getPagination, getPagingData } = require('../src/utils/pagination');
const fs = require('fs-extra');
const path = require("path");
const _ = require("lodash");

module.exports = (sequelize, DataTypes) => {
  class Produk extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      this.belongsTo(models.Kategori, {foreignKey: 'id_kategori'});
      this.belongsTo(models.SubKategori, {foreignKey: 'id_sub_kategori'});
      this.belongsTo(models.Brand, {foreignKey: 'id_brand'});
    }

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
              "gambar_produk",
              "id",
              "id_kategori",
              "id_sub_kategori",
              "id_brand",
              "harga",
              "stok",
              "deskripsi",
          ])
      );

      const filters ={};

      if(filter){
        fields.forEach((item) => (filters[item] = value));  
      }
      else{
        return this.findAndCountAll({  
          include: [{ all: true}],
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
        include: [{ all: true}],
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

    static tambah({idKategori, idSubKategori, idBrand, namaProduk, deskripsi, harga, stok}, fileName){
      return this.create({ 
        id_kategori: idKategori,
        id_sub_kategori: idSubKategori,
        id_brand: idBrand,
        nama_produk: namaProduk,
        deskripsi,
        gambar_produk: fileName,
        harga,
        stok,
      });
    }

    static ubah({idKategori, idSubKategori, idBrand, namaProduk, deskripsi, harga, stok}, fileName, id){
      if (!fileName) {  
        return this.update({id_kategori: idKategori,
        id_sub_kategori: idSubKategori,
        id_brand: idBrand,
        nama_produk: namaProduk,
        deskripsi,
        harga,
        stok,},{ where : {id} });
      }
      else{
        return this.findOne({ where: { id } })
          .then((produk) => {
            fs.remove(path.join(__dirname, `../src/file/gambar_produk/${produk.gambar_produk}`))
              .then(()=>{
                return this.update({id_kategori: idKategori,
                id_sub_kategori: idSubKategori,
                id_brand: idBrand,
                nama_produk: namaProduk,
                deskripsi,
                gambar_produk: fileName,
                harga,
                stok,},{ where : {id} });
              })
          })
      }
      
    }

    static dataById(id) {
      return this.findOne({ where: { id }, include: [{ all: true}] });
    }

    static hapus(id) {

      return this.findOne({ where: { id } })
      .then((produk) => {
        fs.remove(path.join(__dirname, `../src/file/gambar_produk/${produk.gambar_produk}`))
          .then(()=>{
            return this.destroy({ where: { id } });
          })
      })

    }

  }
  Produk.init({
    id_kategori: DataTypes.INTEGER,
    id_sub_kategori: DataTypes.INTEGER,
    id_brand: DataTypes.INTEGER,
    nama_produk: DataTypes.STRING,
    deskripsi: DataTypes.TEXT,
    gambar_produk: DataTypes.STRING,
    harga: DataTypes.INTEGER,
    stok: DataTypes.INTEGER,
  }, {
    sequelize,
    modelName: 'Produk',
  });
  return Produk;
};