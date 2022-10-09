'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {

    return queryInterface.bulkInsert('Roles', [
    { nama_role: 'Admin', createdAt: new Date(), updatedAt: new Date() },
    { nama_role: 'Customer', createdAt: new Date(), updatedAt: new Date() }
    ]);
  
  },

  async down (queryInterface, Sequelize) {
    return queryInterface.bulkDelete('Roles', null, {});
  }
};
