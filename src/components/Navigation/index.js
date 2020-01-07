import React, { useContext } from 'react';

// threejs/gsap
/* import * as THREE from 'three';
import { TweenMax, Power2, TimelineLite, TweenLite, Elastic } from "gsap"; */

//import { Tween, Timeline } from 'react-gsap';
//import gsap, { TweenMax, Utils } from "gsap";

//Context
import { StateContext } from '../StateContext/index';

// style 
import styled from 'styled-components';

//children
import HiddenNav from './HiddenNav';
import NavLink from './NavLink';

/* const Navigation_styled = styled.nav`
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
`; */

const NavContainer = styled.div`
    width: inherit;
    height: 100vh;
    position: fixed;
    left: 0;
    bottom: 0;
    display: ${props => props.activeView === '' ? 'block' : 'none'}
`;



const Navigation = (props) => {
    // global state/updater
    const { state, dispatch } = useContext(StateContext);

    // check if link is active
    const isActive = (name) => name === state.activeView;

    return (
        <NavContainer className="Nav" activeView={state.activeView}>
            <HiddenNav>
                <NavLink
                    navKey={0}
                    name='music'
                    isActive={isActive('music')}
                />
                <NavLink
                    navKey={2}
                    name='story'
                    isActive={isActive('story')}
                />
                <NavLink
                    navKey={1}
                    name='work'
                    isActive={isActive('work')}
                />
                <NavLink
                    navKey={3}
                    name='contact'
                    isActive={isActive('contact')}
                />
            </HiddenNav>
        </NavContainer >
    );
}

export default Navigation;



