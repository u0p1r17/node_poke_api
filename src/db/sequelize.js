const { Sequelize, DataTypes } = require("sequelize");
const PokemonModel = require("../../models/pokemon");
const UserModel = require("../../models/user");
const pokemons = require("./mock-pokemon");
const bcrypt = require("bcrypt");

let sequelize;
if (process.env.NODE_ENV === "production") {
  sequelize = new Sequelize(
    process.env.MYSQLDATABASE,
    process.env.MYSQLUSER,
    process.env.MYSQLPASSWORD,
    {
      host: process.env.MYSQLHOST,
      port: process.env.MYSQLPORT,
      dialect: "mariadb",
      dialectOptions: {
        timezone: "Etc/GMT-2",
      },
      logging: true,
    }
  );
} else {
  sequelize = new Sequelize("pokedex", "root", "", {
    host: "localhost",
    port: "3333",
    dialect: "mariadb",
    dialectOptions: {
      timezone: "Etc/GMT-2",
    },
    logging: false,
  });
}

const Pokemon = PokemonModel(sequelize, DataTypes);
const User = UserModel(sequelize, DataTypes);

const initDb = async () => {
  // console.log("======================>", process.env.NODE_ENV);
  let db = await sequelize.sync();
  let pokemon = await pokemons.map((pokemon) => {
    // Pokemon.create({
    //   name: pokemon.name,
    //   hp: pokemon.hp,
    //   cp: pokemon.cp,
    //   picture: pokemon.picture,
    //   types: pokemon.types,
    // });
  });
  console.log(db);
  // return sequelize.sync().then(_ => {
  //     pokemons.map(pokemon => {
  //         Pokemon.create({
  //             name: pokemon.name,
  //             hp: pokemon.hp,
  //             cp: pokemon.cp,
  //             picture: pokemon.picture,
  //             types: pokemon.types
  //         }).then(pokemon => console.log(pokemon.toJSON()))
  //     })
  //     bcrypt.hash('pikachu',10)
  //     .then(hash => {
  //         User.create({ username: 'pikachu', password: hash })
  //         .then(user=> console.log(user.toJSON()))
  //     })
  //     console.log('La base de donnée a bien été initialisée !')
  // })
};

module.exports = {
  initDb,
  Pokemon,
  User,
};
