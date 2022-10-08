const Router = require('express');
const { Pokemon, Types } = require('../db');
const { getAllPokemon } = require('./controllers/getPokemon');
const router = Router();

router.get('/', async (req, res) => {
    const {name} = req.query;
    const pokemonTotal = await getAllPokemon();
    try {
        if(name) {
            let pokeName = pokemonTotal.filter(e => e.name.toLowerCase().includes(name.toLowerCase()));
            pokeName.length ?
            res.status(200).json(pokeName) :
            res.status(404).send('Pokemon Not Found')
        } else {
            res.status(200).json(pokemonTotal);
        }
    } catch(error) {
        console.log(error);
    }
});

router.get('/:id', async (req, res) => {
    const { id } = req.params;
    const allPokemons = await getAllPokemon();
    try {
        if (id) {
            const pokemonId = allPokemons.filter(e => e.id == id);
            pokemonId.length ?
                res.status(200).json(pokemonId) :
                res.status(404).send('Pokemon not found')
        }
    } catch (error) {
        console.log(error);
    }
});