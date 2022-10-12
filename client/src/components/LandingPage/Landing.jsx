import React from 'react';
import {Link} from 'react-router-dom';
import styles from '../LandingPage/landing.module.css';
import pokebola from '../../assets/pokebola.png';

export default function LandingPage() {
    return (
        <div className={styles.container}>
            <div className={styles.img}>
            <h1 className={styles.titulo}>PI-Pokemons</h1>
            <h2 className={styles.titulo}>Autor: Santiago Rambeaud</h2>
            <p className={styles.titulo}>Welcome to my project, go down and touch the ball to go home!</p>
                <div className={styles.buttCont}>
                <h1 className={styles.bola}>Touch me!</h1>
                    <Link className={styles.butt} to='/pokemons'>
                        <img src={pokebola} alt='pokebola' className={styles.butt} />
                    </Link>
                </div>
            </div>
        </div>
    )
};