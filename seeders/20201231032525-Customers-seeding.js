'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
    */
    return queryInterface.bulkInsert('Customers', [
      {
        identityNumber: '121 6667 77788',
        fullName: 'Lala Moroon',
        address: 'Jakarta',
        birthDate: '2015-10-10',
        gender: 'female',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        identityNumber: '121 3444 12121',
        fullName: 'Jaja Moroon',
        address: 'Jakarta',
        birthDate: '2010-10-10',
        gender: 'male',
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ], {});

  },

  down: (queryInterface, Sequelize) => {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    return queryInterface.bulkDelete('Customers', null, {});
  }
};
