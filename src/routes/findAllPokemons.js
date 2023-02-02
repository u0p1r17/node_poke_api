const { Op } = require('sequelize')
const auth = require('../auth/auth')
const  db  = require('../../models/index')

module.exports = (app) => {
    app.get('/api/pokemons' , auth, async (req, res) => {
        if (req.query.name) {
            // example of true http://localhost:3000/api/pokemons?name=abo
            const name = req.query.name
            const limit =  +req.query.limit || 5
            if(name.length < 3){
                const message = `Le terme de recherche doit contenir au moins 2 caractères.`
                return res.Status(400).json({ message })
            }       
            return db.Pokemons.findAndCountAll({
                where: {
                    name: {
                        [Op.like] : `%${name}%`
                    }
                },
                order: ['name'],
                limit: limit,
            })
                .then(({count, rows}) => {
                    const message = `Il ya ${count} pokémonm qui correspondent au term ${name}.`
                    res.json({ message, data: rows })
                })
        } else {     
            const pokemon = await db.Pokemons.findAll({order: ['name']})
            try {
                const message = 'La liste des pokémons a bien été récupérée.'
                res.json({ message, data: pokemon })
            } catch (error) {
                const message = `La liste des pokémons n'a pas pu être récupérée. Réessayez dans quelques instants.`
                res.status(500).json({ message, data: error })
            }
        }

    })
}

// db.Pokemons.findAll({order: ['name']})
// .then(pokemons => {
//     const message = 'La liste des pokémons a bien été récupérée.'
//     res.json({ message, data: pokemons })
// })
// .catch(error => {
//     const message = `La liste des pokémons n'a pas pu être récupérée. Réessayez dans quelques instants.`
//     res.status(500).json({ message, data: error })
// })