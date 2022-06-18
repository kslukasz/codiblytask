import React, { useContext } from 'react';
import { NavLink } from 'react-router-dom'

import { AppContext } from './AppContext.js'
import './Footer.css'

function Footer() {
    const { currentPage, dataLength, numberOfProducts, changePage } = useContext(AppContext);
    const displus = (currentPage + 1 > Math.ceil(dataLength / numberOfProducts));
    const disminus = (currentPage - 1 < 1)

    return (
        <>
            <NavLink to={`/${currentPage - 1}`}><button className='navigationButton' disabled={disminus ? true : ""} onClick={() => changePage(-1)}>
                <span className="material-symbols-outlined">arrow_back
                </span></button></NavLink>
            <div className='numberPage'>{`${currentPage}\u00a0/\u00a0${Math.ceil(dataLength / numberOfProducts)}`}</div>
            <NavLink to={`/${currentPage + 1}`}><button className='navigationButton' disabled={displus ? true : ""} onClick={() => changePage(1)}>
                <span className="material-symbols-outlined">arrow_forward</span></button></NavLink>
        </>
    );

}

export default Footer;