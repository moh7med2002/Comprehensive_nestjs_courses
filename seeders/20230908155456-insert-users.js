// Example of a seed file
'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    // Insert rows into the "users" table
    await queryInterface.bulkInsert('categories', [
      {
        title: 'math',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        title: 'arabic',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
  },

  down: async (queryInterface, Sequelize) => {
    // Remove the inserted rows
    await queryInterface.bulkDelete('users', null, {});
  },
};
