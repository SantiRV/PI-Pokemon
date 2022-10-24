import { React, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useParams } from 'react-router-dom';
import { getPokemonDetail, resetDetail } from '../../actions/index';
import styles from './details.module.css';

export default function Details() {
    const dispatch = useDispatch();
    const {id} = useParams();

    useEffect(() => {
        dispatch(getPokemonDetail(id));
        dispatch(resetDetail());
    }, [dispatch, id]);

    const pokeDetail = useSelector((state) => state.detail);

    return (
        <div>
            
            <div className={styles.btnContainer} >
                
                <button className={styles.btn}>
                    <Link className={styles.link} to='/pokemon'>
                        Pokemon creator
                    </Link>
                </button>

                <button className={styles.btn}>
                    <Link className={styles.link} to='/pokemons'>
                        Go Back
                    </Link>
                </button>

            </div>

            <div className={styles.container}>
                { Object.keys(pokeDetail).length > 0 ?
                    
                    <div className={styles.card}>
                        
                        <div className={styles.infoContainer}>
                            <h1 className={styles.title}>{ pokeDetail[0].name }</h1>
                        </div>

                        <div className={styles.imgContainer}>
                            <img src={ pokeDetail[0].sprite } alt='' width='250px' height='250px' />
                        </div>

                        <div className={styles.pokemon_types}>
                            <h3>Types: {pokeDetail[0].types ? pokeDetail[0].types.map(e => e.name + (' ')) : pokeDetail[0].Types.map(e => e.name + (' '))}</h3>
                            <h4>Id: {pokeDetail[0].id}</h4>
                            <h4>Hp: {pokeDetail[0].hp}</h4>
                            <h4>Attack: {pokeDetail[0].attack}</h4>
                            <h4>Defense: {pokeDetail[0].defense}</h4>
                            <h4>Speed: {pokeDetail[0].speed}</h4>
                            <h4>Height: {pokeDetail[0].height}</h4>
                            <h4>Weight:{pokeDetail[0].weight}</h4>
                        </div>

                    </div> : <p>Loading...</p>
                }
            </div>
        </div>
    )
};
    