import { React, useState } from 'react';
import { useDispatch } from 'react-redux';
import { getPokemonName } from '../../actions/index';
import styles from './searchBar.module.css';

export default function SearchBar() {
    const dispatch = useDispatch();
    const [name, setName] = useState('')

    function handleInputChange(e) {
        e.preventDefault()
        setName(e.target.value)
    };

    function handleSubmit(e) {
        e.preventDefault();
        if(name) {
            dispatch(getPokemonName(name));
            console.log(name)
        }
        setName('')
    };

    return (
        <div className={styles.container}>
            <input 
              className={styles.input}
              type='text'
              placeholder='Search'
              value={name}
              onChange={(e) => {handleInputChange(e)}}
            />
            <button 
              className={styles.butt}
              type='submit'
              value={name}
              onClick={(e) => {handleSubmit(e)}}>
                Search
              </button>
        </div>
    )
};