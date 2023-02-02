const  db  = require('../../models/index')
const auth = require('../auth/auth')

module.exports = (app) => {
    app.get('/api/pokemons/:id', auth, async (req, res) => {
        const pokemon = await db.Pokemons.findByPk(req.params.id)
        try {
            if(pokemon === null){
                const message = 'Le pokémon demandé n\'existe pas. Réessayez avec un autre identifiant'
                return res.status(404).json({message})
            }
            const message = 'Un pokémon a bien été trouvé.'
            res.json({ message, data: pokemon })
        } catch (error) {
            const message = `le pokémon n'a pas pu être récupéré. Réessayez dans quelques instants.`
            res.status(500).json({message, data: error})
        }
    })
}