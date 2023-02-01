const  db  = require('../../models/index')
const { ValidationError, UniqueConstraintError } = require('sequelize')
const auth = require('../auth/auth')

module.exports = (app) => {
    app.post('/api/pokemons', async (req, res) => {
        try {
            const pokemon = await db.Pokemons.create(req.body)
            const message = `Le pokémon ${req.body.name} a bien été crée.`
            res.json({ message, data: pokemon })
        } catch (error) {
            if(error instanceof ValidationError){
                return res.status(400).json({ message: error.message, data: error})
            }
            if(error instanceof UniqueConstraintError){
                const message = "Ce Pokemon Existe Deja"
                console.log("============> sucerie infinie",error)
                return res.status(400).json({ message: message })
            }
            const message = `Le pokemon n'a pas pu être ajouté. Réessayez dans quelques instants.`
            res.status(500).json({message, data: error})
        }
    })
}
// db.Pokemons.create(req.body)
//     .then(pokemon => {
//         const message = `Le pokémon ${req.body.name} a bien été crée.`
//         res.json({ message, data: pokemon })
//     })
//     .catch(error=>{
//         if(error instanceof ValidationError){
//             return res.status(400).json({ message: error.message, data: error})
//         }
//         if(error instanceof UniqueConstraintError){
//             return res.status(400)({ message: error.message })
//         }
//         const message = `Le pokemon n'a pas pu être ajouté. Réessayez dans quelques instants.`
//         res.status(500).json({message, data: error})
//     })