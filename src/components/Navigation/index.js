import React, { useContext, useEffect } from 'react';

// threejs/gsap
/* import * as THREE from 'three';
import { TweenMax, Power2, TimelineLite, TweenLite, Elastic } from "gsap"; */

//import { Tween, Timeline } from 'react-gsap';
//import gsap, { TweenMax, Utils } from "gsap";

//Context
import { StateContext } from '../StateContext/index';

// style 
import styled, { css, keyframes } from 'styled-components';
import responsive from '../../AtMedia/index';
import './index.css';

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

/**
 *
 * display: ${props => props.activeView === '' || props.activeView === '/' ? 'block' : 'none'}
 */


const fadeIn = keyframes`
  0% {
    opacity: 0;
    transform: translate3d(0px, 50px, 0px) scale(1.5);
  }100% {
    z-index: 1;
    opacity: 1;
    transform: translate3d(0px, 0px, 0px) scale(1);
  }
`;

const riseUp = keyframes`
  0% {
    z-index: 1;
    opacity: 1;
    transform: translate3d(0px, 100%, 0px);
  }100% {
    z-index: 1;
    opacity: 1;
    transform: translate3d(0px, -50px, 0px);
  }
`;

const goDown = keyframes`
  0% {
    z-index: 1;
    opacity: 1;
    transform: translate3d(0px, -50px, 0px);
  }100% {
    z-index: 1;
    opacity: 1;
    transform: translate3d(0px, 100%, 0px);
  }
`;

const fadeOut = view => {
    let power = '';

    if (view === 'work' || view === 'contact') {
        power = '-'
    }

    let xyz = [
        0,
        0,
        0
    ];

    if (view === 'music' || view === 'contact') {
        xyz[0] = power + 200;
    } else {
        xyz[1] = power + 200;
    }

    let values = String(xyz.map(val => val + 'px'));

    return keyframes`
        0%{
            opacity: 1;
            transform: translate3d(0px, 0px, 0px);
        }100% {
            z-index: -1;
            opacity: 0;
            transform: translate3d(${values});
        }
    `;
}

// display nav
const display = (view) => {
    switch (view) {
        case 'music':
        case 'story':
        case 'work':
        case 'contact':
            return false;
        default:
            return true;
    }
};


const NavContainer = styled.div`
    position: absolute;
    bottom: 0;
    z-index: 1;
   
    text-align: center;
    width: 100vw;
    height: 50vw;

    opacity: ${ props => props.displayNav
        ? '0'
        : props.fadeAwayNav
            ? '1'
            : '0'
    };

    animation: ${props => props.displayNav
        ? (props.activeView === '' || props.activeView === '/'
            ? css`.4s ${fadeIn} ease-out .3s forwards;`
            : css`.4s ${riseUp} ease-out .3s forwards;`)
        : (props.fadeAwayNav
            ? (props.activeView === ''
                ? css`.4s ${fadeOut(props.activeView)} ease-out forwards;`
                : css`.4s ${goDown} ease-out forwards;`)
            : 'none')
    };

    ${responsive('orientation').landscape`
        max-height: 50vh;
    `};
`;





const Navigation = (props) => {
    //console.log(props.activeView)
    // global state/updater
    const { state, dispatch } = useContext(StateContext);

    const { activeView, displayNav, fadeAwayNav } = state;

    // check if link is active
    const isActive = (name) => name === activeView;

    return (
        <NavContainer className={`Nav`} activeView={activeView} displayNav={displayNav} fadeAwayNav={fadeAwayNav}>
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



