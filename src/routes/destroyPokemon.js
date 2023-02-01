const  db  = require('../../models/index')
const auth = require('../auth/auth')

module.exports = (app) => {
    app.delete('/api/pokemons/:id',  async (req, res) => {
        try {
            const pokemon = await db.Pokemons.findByPk(req.params.id)
            if (pokemon === null) {
                const message = 'Le pokémon demandé n\'existe pas. Réessayez avec un autre identifiant'
                return res.status(404).json({ message })
            }
            const pokemonDeleted = await pokemon.destroy({
                where: { id: pokemon.id }
            })
            const message = `Le pokemon avec l'identifiant n°${pokemonDeleted.id} a bien été suprimer`
            res.json({ message, data: pokemonDeleted })
        } catch (error) {
            const message = `Le pokemon n'a pas pu être suprimer. Réessayez dans quelques instants.`
            res.status(500).json({message, data: error})
        }
    })
}