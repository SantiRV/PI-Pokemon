import React from 'react';
import styles from './pagination.module.css';

//traigo las propiedades de Home
export default function Pagination({ currentPage, pokemonPerPage, allPokemon, pagination}) {
    const pageNumbers = []; //Este arreglo terminara siendo un arreglo de numeros del resultado del ciclo for

    // recorro el arreglo que resulta de dividir todos los pokemon por la cantidad de 
    // pokemon por pag y los agrego al array
    for(let i = 1; i <= Math.ceil(allPokemon/pokemonPerPage); i++) {
        pageNumbers.push(i)
    };

    return (
        //Mapeo el arreglo y devuelvo el num correspondiente
        <nav className={styles.paginate}>
            {pageNumbers && pageNumbers.map((number, index) => {
                return (
                    <div key={index} className={styles.item}>
                        <button className={styles.butt} onClick={() => pagination(number)}>{number}</button>
                    </div>
                )
            })}
        </nav>
    )
}; 