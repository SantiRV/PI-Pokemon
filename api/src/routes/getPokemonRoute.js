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
                res.status(404).send('Pokemon Not Found')
        }
    } catch (error) {
        console.log(error);
    }
});

router.delete('/:id', async (req, res) => {
    const {id} = req.params;
    const allPokemons = await getAllPokemon();
    try {
        if(id) {
            const deletePokemon = allPokemons.filter(poke => poke.id === id);
            deletePokemon.length ?
            res.status(200).send('Pokemon delete') :
            res.status(404).send('Error')
        }
    } catch(error) {
        console.log(error)
    }
});

router.post('/', async (req, res) => {
    const {name, hp, attack, defense, speed, height, weight, sprite, createdInDb, types } = req.body;
    if(!name || !hp || !attack || !defense || !speed || !height || !weight) {
        console.log(name);
        return res.status(400).json({info: 'Falta ingresar un dato'});
    }

    let arrType = [];
    req.body.types.map(e => arrType.push({ name: e }));
    if(!arrType.length) {
        return res.status(400).json({info: 'Debes elegir al menos un tipo'});
    }
    console.log(arrType, 'ARRAY');

    const exist = await  Pokemon.findOne({ where: {name: req.body.name } });
    console.log(exist);

    if(exist) {
        console.log(exist);
        return res.send(400).json({ info: "nombre existente"})
    }
    
    try {
        const createPokemon = Pokemon.create({
            name,
            hp,
            attack,
            defense,
            speed,
            height,
            weight,
            sprite,
            createdInDb  
        });
        const createdDb = await Types.findAll({
            where: { name: types }
        });
        createPokemon.addType(createdDb);
        return res.status(200).send('Pokemon created')
    } catch(error) {
        console.log(error);
    }

});

module.exports = router;