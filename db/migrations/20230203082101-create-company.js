'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('companies', {
      id: {
        allowNull: false,
        primaryKey: true,
        type: Sequelize.STRING
      },
      name: {
        type: Sequelize.STRING
      },
      ceo: {
        type: Sequelize.STRING
      },
      description: {
        type: Sequelize.TEXT
      },
      tags: {
        type: Sequelize.JSON
      },
      sector: {
        type: Sequelize.STRING
      },
      score: {
        type: Sequelize.DOUBLE
      },
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('companies');
  }
};