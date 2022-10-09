'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    return queryInterface.bulkInsert('Users', [
    { 
      id:'766ffa59-59a4-4308-addf-fce6bfe69c0a',
      id_role: 1,
      nama: 'Wilando Putrayuda',
      email:'lando45@ymail.com',
      password: '$2b$10$ES7XZo5aG2ikhXcMNj6xCO.HTT3l9Xt8Q.yQrs5oWm06rVCUjPngu',
      createdAt: new Date(),
      updatedAt: new Date() 
    }
    ]);
  },

  async down (queryInterface, Sequelize) {
    return queryInterface.bulkDelete('Users', null, {});
  }
};
