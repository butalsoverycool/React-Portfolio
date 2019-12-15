import React from 'react';

// shared
import NavLink from '../NavLink/index';

// style 
import './index.scss';



const Navigation = (props) => {
    const isActiveLink = (name) => name === props.activeView;

    return (
        <div className="Navigation">
            <NavLink
                name='home'
                isActive={isActiveLink('home')}
                setActiveView={props.setActiveView}
            />
            <NavLink
                name='story'
                isActive={isActiveLink('story')}
                setActiveView={props.setActiveView}
            />
            <NavLink
                name='news'
                isActive={isActiveLink('news')}
                setActiveView={props.setActiveView}
            />
            <NavLink
                name='contact'
                isActive={isActiveLink('contact')}
                setActiveView={props.setActiveView}
            />
        </div >
    );
}

export default Navigation;