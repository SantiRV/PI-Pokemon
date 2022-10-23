import { React, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { createPokemon, getPokemonTypes } from '../../actions/index';
import styles from './styles.module.css';

export default function PokemonCreate() {
    const dispatch = useDispatch();
    const history = useHistory();
    const tipos = useSelector((state) => state.types);
    const [errors, setErrors] = useState({});
    const [input, setInput] = useState({
        name: '',
        hp: '',
        attack: '',
        defense: '',
        speed: '',
        height: '',
        weight: '',
        sprite: '',
        types: []
    });

    function isNumber(n) {
        if (/^\d+$/.test(n)) {
            return true;
        }
        return false;
    };

    function isString(n) {
        if (/^\D+$/.test(n)) {
            return true;
        }
        return false;
    };

    function validate(input) {
        let errors = {};
        if(!input.name) {
            errors.name = 'Complete name';
        } else if(!isString(input.name)) errors.name = 'Letters only!';
        else if(!input.hp) errors.hp = 'Compleate Please';
        else if (!isNumber(input.hp)) errors.hp = 'Just numbers!';
        else if (!input.attack) errors.attack = 'Compleate Please';
        else if (!isNumber(input.attack)) errors.attack = 'Just numbers!';
        else if (!input.defense) errors.defense = 'Compleate Please';
        else if (!isNumber(input.defense)) errors.defense = 'Just numbers!';
        else if (!input.speed) errors.speed = 'Compleate Please';
        else if (!isNumber(input.speed)) errors.speed = 'Just numbers!';
        else if (!input.height) errors.height = 'Compleate Please';
        else if (!isNumber(input.height)) errors.height = 'Just numbers!';
        else if (!input.weight) errors.weight = 'Compleate Please';
        else if (!isNumber(input.weight)) errors.weight = 'Just numbers!';
        return errors; 
    }

    function handleChange(e) {
        e.preventDefault();
        setInput({
            ...input,
            [e.target.name] : e.target.value
        })
        setErrors(validate({
            ...input,
            [e.target.name] : e.target.value
        }))
    };

    function handleSelect(e) {
        e.preventDefault();
        input.types.length < 2 && !input.types.includes(e.target.value) ? setInput({
            ...input,
            types: [...input.types, e.target.value]
        }) : alert('Maximum 2 types')
    };

    function handleSubmit(e) {
        e.preventDefault();
        if(Object.values(errors).length){
            let message = {};
            let err = Object.values(errors);
            return alert(message = err.map(e => e + '\n'));
        } else {
           const { name, hp, attack, defense, speed, height, weight, sprite, types } = input;
           if (name && hp && attack && defense && speed && height && weight && sprite
             && types.length !== 0) {
            dispatch(createPokemon(input));
                alert("Pokemon created!");
            } else {
                alert("Complete the form!");
                history.push('/pokemon')
            }
            setInput({
                name: "",
                hp: "",
                attack: "",
                defense: "",
                speed: "",
                height: "",
                weight: "",
                sprite: "",
                types: [],
            });
            history.push("/pokemons");
        }
    };

    function handleDelete(e) {
        setInput({
            ...input,
            types: input.types.filter(el => el !== e)
        })
    };

    useEffect(() => {
        dispatch(getPokemonTypes());
    }, [dispatch]);

    return (
        <div className={styles.cont}>
            <h1 className={styles.h1}>Create your own Pokemon</h1>
            <form className={styles.form} onSubmit={(e) => handleSubmit(e)}>
                <div className={styles.inputCont}>
                    <label htmlFor='name'>Name: </label>
                    <input 
                        className={styles.input}
                        type='text'
                        value={input.name}
                        name='name'
                        id='name'
                        onChange={(e) => handleChange(e)}
                        required
                    />
                    {errors.name && (
                        <p>{errors.name}</p>
                    )}
                </div>

                <div className={styles.inputCont}>
                    <label htmlFor='attack'>Attack: </label>
                    <input
                        className={styles.input}
                        type='number'
                        value={input.attack}
                        name='attack'
                        id='attack'
                        onChange={(e) => handleChange(e)}
                        requierd
                    />
                    {errors.attack && (
                        <p>{errors.attack}</p>
                    )}
                </div>

                <div className={styles.inputCont}>
                    <label htmlFor='hp'>Hp: </label>
                    <input
                        className={styles.input}
                        type='number'
                        value={input.hp}
                        name='hp'
                        id='hp'
                        onChange={(e) => handleChange(e)}
                        required
                    />
                    {errors.hp && (
                        <p>{errors.hp}</p>
                    )}
                </div>

                <div className={styles.inputCont}>
                    <label htmlFor='defense'>Defense: </label>
                    <input 
                        className={styles.input}
                        type='number'
                        value={input.defense}
                        name='defense'
                        id='defense'
                        onChange={(e) => handleChange(e)}
                        required
                    />
                    {errors.defense && (
                        <p>{errors.defense}</p>
                    )}
                </div>

                <div className={styles.inputCont}>
                    <label htmlFor='speed'>Speed: </label>
                    <input 
                        className={styles.input}
                        type='number'
                        value={input.speed}
                        name='speed'
                        id='speed'
                        onChange={(e) => handleChange(e)}
                        required
                    />
                    {errors.speed && (
                        <p>{errors.speed}</p>
                    )}
                </div>

                <div className={styles.inputCont}>
                    <label>Height: </label>
                    <input 
                        className={styles.input}
                        
                </div>
            </form>
        </div>
    )
    
    
    
}