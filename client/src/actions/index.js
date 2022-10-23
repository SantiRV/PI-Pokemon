import axios from 'axios';
import {
    GET_POKEMON,
    GET_TYPES,
    CREATED_DB,
    FILTER_ATTACK,
    FILTER_ALPHABETICAL,
    FILTER_BY_TYPE,
    GET_POKEMON_DETAIL,
    RESET_DETAIL,
    GET_POKEMON_NAME
} from './constants';

export function getPokemon() {
    return async (dispatch) => {
        try {
            let pokemon = await axios('http://localhost:3001/pokemons');
            return dispatch({
                type: GET_POKEMON,
                payload: pokemon.data
            })
        } catch(error) {
            console.log(error);
        }
    }
};

export function getPokemonTypes() {
    return async (dispatch) => {
        try {
            let pokemonTypes = await axios('http://localhost:3001/types');
            console.log(pokemonTypes)
            return dispatch({
                type: GET_TYPES,
                payload: pokemonTypes.data
            })
        } catch(error) {
            console.log(error);
        }
    }
};

export function filterPokemonsByType(payload) {
    console.log(payload);
    return {
        type: FILTER_BY_TYPE,
        payload
    }
};

export function filterCreatedDB(payload) {
    console.log(payload);
    return {
        type: CREATED_DB,
        payload
    }
};

export function filterAttack(payload) {
    console.log(payload);
    return {
        type: FILTER_ATTACK,
        payload
    }
};

export function filterAlphabetical(payload) {
    return {
        type: FILTER_ALPHABETICAL,
        payload
    }
};

export function getPokemonDetail(id) {
    console.log(id, 'pokeId');
    return async function(dispatch) {
        try {
            let json = await axios.get(`http://localhost:3001/pokemons/${id}`);
            console.log(json, 'Detalle del poke');
            return dispatch({
                type: GET_POKEMON_DETAIL,
                payload: json.data
            })
        } catch(error) {
            console.log(error);
        }
    }
};

export function getPokemonName(name) {
    return async function(dispatch) {
        try {
            const pokeName = await axios.get(`http://localhost:3001/pokemons?name=${name}`);
            console.log(pokeName.data.name);
            return dispatch({
                type: GET_POKEMON_NAME,
                payload: pokeName.data
            })
        } catch(error) {
            alert('Debes ingresar el nombre completo!')
        }
    }
};

export function getClonePokemon(name) {
    return async function () {
        const pokeName = await axios.get(`http://localhost:3001/pokemons?name=${name}`);
        if (!pokeName) {
            return false
        }
        return true
    }
};

export function createPokemon(details) {
    return async function (dispatch) {
        try {
            const newPokemon = await axios.post('http://localhost:3001/pokemons', details)
            return dispatch({
                type: 'CREATE_POKEMON',
                payload: newPokemon.data
            })

        } catch (error) {
            console.log(error);
        }
    }
};

export function resetDetail(payload) {
    return {
        type: RESET_DETAIL,
        payload
    }
};