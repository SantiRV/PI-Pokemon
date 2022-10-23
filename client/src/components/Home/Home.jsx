import React from 'react';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { 
    getPokemon,
    filterPokemonsByType,
    filterCreatedDB,
    filterAttack,
    filterAlphabetical,
} from '../../actions/index';
import { Link } from 'react-router-dom';
import Card from '../Card/Card';
import Pagination from '../Pagination/Pagination';
import NavBar from '../NavBar/NavBar';
import styles from './home.module.css';

export default function Home() {
    const dispatch = useDispatch();
    const allPokemon = useSelector(state => state.pokemons);

    const [order, setOrder] = useState('');
    const [attack, setAttack] = useState('');
    const [currentPage, setCurrentPage] = useState(1);
    const [pokemonPerPage, setPokemonPerPage] = useState(8);
    const indexLastPokemon = currentPage * pokemonPerPage;
    const indexFirstPokemon = indexLastPokemon - pokemonPerPage;
    const currentPokemon = allPokemon.slice(indexFirstPokemon, indexLastPokemon);

    const paging = (pageNumber) => {
        setCurrentPage(pageNumber)
    };

    useEffect(() => {
        dispatch(getPokemon());
    }, [dispatch])

    function handleClick(e) {
        e.preventDefault();
        dispatch(getPokemon)
    };

    function handleTypes(e) {
        e.preventDefault();
        dispatch(filterPokemonsByType(e.target.value));
        setCurrentPage(1)
    };

    function handleFilterCreatedInDb(e) {
        e.preventDefault();
        dispatch(filterCreatedDB(e.target.value));
        setCurrentPage(1)
    };

    function handleFilterAttack(e) {
        e.preventDefault();
        dispatch(filterAttack(e.target.value));
        setCurrentPage(1);
        setAttack(`Ordenado ${e.target.value}`);
    };

    function handleFilterAlphabetical(e) {
        e.preventDefault();
        dispatch(filterAlphabetical(e.target.value));
        setCurrentPage(1);
        setOrder(`Ordenado ${e.target.value}`);
    };

    function search() {
        setCurrentPage(1)
    };

    return (
        <div className={styles.body}>
            <NavBar
                search={search}
                typesFilter={handleTypes}
                attackFilter={handleFilterAttack}
                orderFilter={handleFilterAlphabetical}
                cratedFilter={handleFilterCreatedInDb}
            />
            
            <div className={styles.navContainer}>
                <button onClick={e => {handleClick(e)}} className={styles.btn}>
                    Recharge
                </button>
                <Link to='/pokemon'>
                    <button className={styles.btn}>
                        Crate
                    </button>
                </Link>
            </div>

            <div className={styles.cardContainer}>
                {currentPokemon.length ? currentPokemon?.map((e, index) => {
                    return (
                        <div key={index} className={styles.pokemon}>
                            <Link className={styles.link} to={'/details' + e.id }>
                                <Card
                                    name={e.name}
                                    types={e.types.map(el => el.name + (' '))}
                                    sprite={e.sprite}
                                    key={e.id}
                                />
                            </Link>
                        </div>
                    );
                }) : 
                <p>Loading...</p>
                }
            </div>

            <div>
                <Pagination
                    pokemonPerPage={pokemonPerPage}
                    allPokemon={allPokemon.length}
                    paging={paging}
                />
            </div>
        </div>
    )
};