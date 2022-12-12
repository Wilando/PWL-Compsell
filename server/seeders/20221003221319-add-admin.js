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
    },
    { 
      id:'a16b2022-f6e6-4def-b3ca-0501d45b888e',
      id_role: 2,
      nama: 'Wilando Putrayuda',
      email:'wilando45@ymail.com',
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
