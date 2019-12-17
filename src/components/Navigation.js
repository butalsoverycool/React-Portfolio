import React from 'react';

// shared
import NavLink from './NavLink';

// style 
import styled from 'styled-components';

const Navigation_styled = styled.nav`
    position: relative;
    width: inherit;
    height: 100px;
    margin: auto;
    margin-top: 100px;
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