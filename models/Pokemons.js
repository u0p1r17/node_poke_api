'use strict';
const {
  Model
} = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Pokemons extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    
  }
  Pokemons.init({
    name: DataTypes.STRING,
    hp: DataTypes.INTEGER,
    cp: DataTypes.INTEGER,
    picture: DataTypes.STRING,
    types: DataTypes.STRING,
  }, {
    sequelize,
    timestamps:true,
    createdAt: 'created',
    updatedAt: false,
  });
  return Pokemons;
};