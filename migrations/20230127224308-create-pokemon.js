"use strict";
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable(
      "Pokemons",
      {
        id: {
          allowNull: false,
          autoIncrement: true,
          primaryKey: true,
          type: Sequelize.INTEGER,
        },
        name: {
          type: Sequelize.STRING,
          unique: true,

        },
        hp: {
          type: Sequelize.INTEGER,
        },
        cp: {
          type: Sequelize.INTEGER,
        },
        picture: {
          type: Sequelize.STRING,
        },
        types: {
          type: Sequelize.STRING,
          get() {
            return this.getDataValue("types").split(",");
          },
          set(types) {
            this.setDataValue("types", types.join());
          },          
        },
        created:{
          type: Sequelize.DATE
        }
      },
    );
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable("Pokemons");
  },
};
