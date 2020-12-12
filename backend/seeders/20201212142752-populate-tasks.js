'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return await queryInterface.bulkInsert('tasks', [{
      desc: 'Realizar teste de programação',
      done: true
    }, {
      desc: 'Ir para o supermercado',
      done: false
    }, {
      desc: 'Construir minha casa',
      done: false
    }, {
      desc: "Montar notebook de cliente",
      done: true
    }])
  },

  down: async (queryInterface, Sequelize) => {
    return await queryInterface.bulkDelete('tasks', null, {})
  }
};
