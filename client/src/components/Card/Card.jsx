import React from 'react';
import styles from './card.module.css';

export default function Card({ name,sprite, types }) {
    return (
        <div className={styles.pokemon}>
            <div className={styles.pokecontainer}>
                <div clssName={styles.imgCont}>
                    <img className={styles.img_poke} src={sprite} alt='img pokemon' width="250px" height="250px" />
                </div>
                <div className={styles.pokemon_footerCard}>
                    <div className={styles.pokemon_body}>
                        <h3 className={styles.pokemon_name}>{name}</h3>
                        <ul className={styles.pokemon_types}>{types}</ul>
                    </div>
                </div>
            </div>
        </div>
    )
};