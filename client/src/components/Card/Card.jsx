import React from 'react';
import s from './card.module.css';

export default function Card({ name,sprite, types }) {
    return (
        <div className={s.pokemon}>
            <div className={s.pokecontainer}>
                <div clssName={s.imgCont}>
                    <img className={s.img_poke} src={sprite} alt='img pokemon' width="250px" height="250px" />
                </div>
                <div className={s.pokemon_footerCard}>
                    <div className={s.pokemon_body}>
                        <h3 className={s.pokemon_name}>{name}</h3>
                        <ul className={s.pokemon_types}>{types}</ul>
                    </div>
                </div>
            </div>
        </div>
    )
};