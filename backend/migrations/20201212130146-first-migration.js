'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.createTable('tasks',{
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        allowNull: false,
        autoIncrement: true
      },
      desc: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      done: {
        type: Sequelize.BOOLEAN,
        allowNull: false,
        defaultValue: false
      }
    })
  },

  down: async (queryInterface, Sequelize) => {
    return queryInterface.dropTable('tasks')
  }
};
