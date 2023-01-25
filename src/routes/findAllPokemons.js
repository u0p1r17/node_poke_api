const { Pokemon } = require('../db/sequelize')
const { Op } = require('sequelize')
const auth = require('../auth/auth')

module.exports = (app) => {
    app.get('/api/pokemons',auth , (req, res) => {
        if (req.query.name) {
            const name = req.query.name
            const limit =  +req.query.limit || 5

            if(name.length < 3){
                const message = `Le terme de recherche doit contenir au moins 2 caractères.`
                return res.Status(400).json({ message })
            }
            
            return Pokemon.findAndCountAll({
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
            Pokemon.findAll({order: ['name']})
                .then(pokemons => {
                    const message = 'La liste des pokémons a bien été récupérée.'
                    res.json({ message, data: pokemons })
                })
                .catch(error => {
                    const message = `La liste des pokémons n'a pas pu être récupérée. Réessayez dans quelques instants.`
                    res.status(500).json({ message, data: error })
                })
        }

    })
}