'use strict';
const {
  Model
} = require('sequelize');

/* import bcrypt untuk melakukan enkripsi */
const bcrypt = require('bcrypt');
const { v4: uuidv4 } = require('uuid');

module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }

    // Method untuk melakukan enkripsi
    static async encrypt(password) {
      const hashedPassword = await bcrypt.hash(password, 10);
      return hashedPassword;
    }

    /* Method tambahAdmin, untuk menambahkan Admin */
    static async tambahAdmin({
      nama, email, password,
    }) {
      const encryptedPassword = await this.encrypt(password);
      /*
        encrypt dari static method
        encryptedPassword akan sama dengan string hasil enkripsi password dari method encrypt
      */

      return this.create({
        id_role: 1, nama: nama, email, password: encryptedPassword,
      });
    }

    static dataAdminById(id) {
      return this.findOne({ where: { id, id_role: 1 } });
    }

    /* Method update, untuk update Admin */
    static async updateAdmin({
      nama, email, password,
    }, id) {
      if (password != '') {
        const encryptedPassword = await this.encrypt(password);
        return this.update({
          nama: nama, email, password: encryptedPassword,
        }, { where: { id, id_role: 1 } });
      }

      return this.update({ nama: nama, email }, { where: { id, id_role: 1 } });
    }
    //-------------------------------Customer-------------------------------------------
    /* Method Register */
    static async register({
      nama, email, password,
    }) {
      const encryptedPassword = await this.encrypt(password);
      /*
        encrypt dari static method
        encryptedPassword akan sama dengan string hasil enkripsi password dari method encrypt
      */

      return this.create({
        id_role: 2, nama: nama, email, password: encryptedPassword,
      });
    }

    static dataCustomerById(id) {
      return this.findOne({ where: { id, id_role: 2 } });
    }

    /* Method update, untuk update Customer */
    static async updateCustomer({
      nama, email, password,
    }, id) {
      if (password != '') {
        const encryptedPassword = await this.encrypt(password);
        return this.update({
          nama: nama, email, password: encryptedPassword,
        }, { where: { id, id_role: 2 } });
      }

      return this.update({ nama: nama, email }, { where: { id, id_role: 2 } });
    }
  }
  User.init({
    id_role: DataTypes.INTEGER,
    nama: DataTypes.STRING,
    email: DataTypes.STRING,
    password: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'User',
  });

  User.addHook('beforeCreate', async (user) => {
    return user.id = uuidv4();
  });

  return User;
};