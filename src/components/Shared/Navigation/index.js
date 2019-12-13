import React from 'react';

// shared
import NavLink from '../NavLink/index';

// style 
import './index.scss';

const Navigation = (props) => (
    <div className="Navigation">
        <NavLink
            name='home'
            activeView={props.activeView}
        />
        <NavLink
            name='story'
            activeView={props.activeView}
        />
        <NavLink
            name='news'
            activeView={props.activeView}
        />
        <NavLink
            name='contact'
            activeView={props.activeView}
        />
    </div >
);

export default Navigation;