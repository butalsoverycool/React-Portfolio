import React from 'react';

// shared
import NavLink from './NavLink';

// style 
import styled from 'styled-components';

const Navigation_styled = styled.nav`
    position: fixed;
    z-index: 1;
    display: flex;
    justify-content: space-evenly;
    left: 0;
    top: 0;
    width: inherit;
    height: 100px;
    margin: 0;
    padding: 10px 0;
    text-align: center;
`;

const Navigation = (props) => {
    const isActiveLink = (name) => name === props.activeView;

    return (
        <Navigation_styled className="Nav">
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
        </Navigation_styled >
    );
}

export default Navigation;