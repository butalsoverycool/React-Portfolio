import React from 'react';

// shared
import NavLink from '../NavLink/index';

// style 
import './index.scss';

const Navigation = () => (
    <div className="Navigation">
        <NavLink destination='home' />
        <NavLink destination='story' />
        <NavLink destination='news' />
        <NavLink destination='contact' />
    </div >
);

export default Navigation;