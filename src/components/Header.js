import React, {useContext} from 'react';
import {AppContext} from './AppContext.js'
import './Header.css'

function Header() {     
    const { input , chandleInput } = useContext(AppContext);
    return (
        <header className='cont_horizontal'>
            <div className='fontBig padding10'>Welcome - It's products page</div>            
            <div className='cont_vertical cont_center'>
            <div className='padding10 fontBigger'>Filter by ID:</div>
            <input type="number" className='padding10 fontBigger' max={99} onChange={chandleInput} value={input} />
            </div>
        </header>
    );
}

export default Header;