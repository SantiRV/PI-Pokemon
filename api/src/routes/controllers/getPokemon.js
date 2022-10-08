const { Pokemon,Types } = require('../../db');
const axios = require('axios');

const getPokemonApi = async () => {
    const firstPage = await axios.get("https://pokeapi.co/api/v2/pokemon"); //Trae los priimeros 20 poke de la api
    const nextPage = await axios.get(firstPage.data.next); //Trae los 20 poke siguientes
    const pokemonTotal = firstPage.data.results.concat(nextPage.data.results); //Creamos una variable para concatenar todos los poke

    try {
        const apiInfo = pokemonTotal.map(pokemon => axios.get(pokemon.url)); // en la prop 'url' es donde se encuentran los datos que necesito
        let infoPokemons = Promise.all(apiInfo) // Promise.all para la respuesta de cada url(info)
        .then(poke => {
            let pokemon = poke.map(element => element.data);
            let info = []; // creo un arreglo con la info que necesito de cada poke
            pokemon.map(e => {
                info.push({
                    id: e.id,
                    name: e.name.charAt(0).toUpperCase() + e.name.slice(1),
                    hp: e.stats[0].base_stat,
                    attack: e.stats[1].base_stat,
                    defense: e.stats[2].base_stat,
                    speed: e.stats[5].base_stat,
                    height: e.height,
                    weight: e.weight,
                    sprite: e.sprites.other["official-artwork"].front_default,
                    types: e.types.length < 2 ? [{name: e.types[0].type.name}] : [{name: e.types[0].type.name}, {name: e.types[1].type.name}]

                })
            })
            return info;
        })
        return infoPokemons;
    } catch(error) {
        console.log(error)
    }
};

// Pokemons de la DB

const getPokemonDb = async () => {
    try {
        return await Pokemon.findAll({
//Incluido el modelo Tipos y solo devolviendo el atributo de nombre.
            include: {
                model: Types,
                attributes: ['name'],
                through: {
                    attributes: []
                }
            }
        })
    } catch(error) {
        console.log(error);
    }
};

//Concateno los datos de la api con la DB

const getAllPokemon = async () => {
    const apiInfo = await getPokemonApi();
    const dbInfo = await getPokemonDb();
    const totalInfo = apiInfo.concat(dbInfo);
    return totalInfo;
};

module.exports = {
    getPokemonApi,
    getPokemonDb,
    getAllPokemon
};