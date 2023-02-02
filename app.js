const express = require("express");
const favicon = require("serve-favicon");
const bodyParser = require("body-parser");
const db = require('./models/index')
const cors = require('cors')

const app = express();
const port = process.env.PORT || 3005;

app
  .use(favicon(__dirname + "/favicon.ico"))
  .use(bodyParser.json())
  .use(cors());

db.sequelize.sync()

app.get('/', (req, res) => res.send('hello, Express54!'))

// Ici, nous placerons futurs points de terminaison.
require("./src/routes/findAllPokemons")(app);
require("./src/routes/findPokemonByPk")(app);
require("./src/routes/createPokemon")(app);
require("./src/routes/updatePokemon")(app);
require("./src/routes/destroyPokemon")(app);
require("./src/routes/login")(app);

// on ajoute la gestion des erreurs 404
app.use(({ res }) => {
  const message =
    "Impossible de trouver la ressource demandée ! vous pouvez essayer une autre URL.";
  res.status(404).json({ message });
});

app.listen(port, () =>
  console.log(
    `Notre application Node est démarrée sur : http://localhost:${port}`
  )
);

// .ENDPOINT METHODE WITHOUT DB

// app.get('/', (req, res) => res.send('hello, Express54!'))

// app.get('/api/pokemons/:id', (req, res) => {
//     const id = parseInt(req.params.id)
//     const pokemon = pokemons.find(pokemon => pokemon.id === id)
//     const message = 'un pokemon a bien été trouvé'
//     if (id > pokemons.length) {
//         res.json(err("Pokemon inexistant"))
//     }
//     res.json(success(message, pokemon))
// })

// app.get('/api/pokemons', (req, res) => {
//     res.json(success("Voici la liste des pokemon", pokemons))
// })

// app.post('/api/pokemons', (req, res) => {
//     const id = getUniqueId(pokemons)
//     const pokemonCreated = { ...req.body, ...{ id: id, created: new Date() } }
//     console.log(JSON.stringify(req.body))
//     pokemons.push(pokemonCreated)
//     const msg = `Le pokemon ${pokemonCreated.name} a été crée`
//     return res.json(success(msg, pokemonCreated))
// })

// app.put('/api/pokemons/:id', (req, res) => {
//     const id = parseInt(req.params.id)
//     const pokemonUpdated = { ...req.body, id: id }
//     pokemons = pokemons.map(pokemon => {
//         return pokemon.id === id ? pokemonUpdated : pokemon
//     })
//     const message = `Le pokemon ${pokemonUpdated.name} a bien été modifé`
//     res.json(success(message, pokemonUpdated))
// })

// app.delete('/api/pokemons/:id', (req, res) => {
//     const id = parseInt(req.params.id)
//     const pokemonDeleted = pokemons.find(pokemon => pokemon.id === id)
//     // console.log(pokemons.filter(pokemon => pokemon.id !== id))
//     pokemons = pokemons.filter(pokemon => pokemon.id !== id)
//     const message = `Le pokemon ${pokemonDeleted.name} a bien été suprimer`
//     res.json(success(message, pokemonDeleted))
// })
