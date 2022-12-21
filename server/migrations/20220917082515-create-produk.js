'use strict';
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Produks', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      id_kategori: {
        type: Sequelize.INTEGER,
        references: {
          model: "Kategoris",
          key: 'id'
        },
        onDelete: "CASCADE"
      },
      id_sub_kategori: {
        type: Sequelize.INTEGER,
        references: {
          model: "SubKategoris",
          key: 'id'
        },
        onDelete: "CASCADE"
      },
      id_brand: {
        type: Sequelize.INTEGER,
        references: {
          model: "Brands",
          key: 'id'
        },
        onDelete: "CASCADE"
      },
      nama_produk: {
        type: Sequelize.STRING
      },
      deskripsi: {
        type: Sequelize.TEXT
      },
      gambar_produk: {
        type: Sequelize.STRING
      },
      harga: {
        type: Sequelize.INTEGER
      },
      stok: {
        type: Sequelize.INTEGER
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Produks');
  }
};