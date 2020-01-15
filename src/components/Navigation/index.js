import React, { useContext, useEffect, useLayoutEffect, useState } from 'react';
import * as FUNCS from '../../logic/functions';

// threejs/gsap
/* import * as THREE from 'three';
import { TweenMax, Power2, TimelineLite, TweenLite, Elastic } from "gsap"; */

//import { Tween, Timeline } from 'react-gsap';
//import gsap, { TweenMax, Utils } from "gsap";

//Context
import { StateContext } from '../StateContext/index';

// style 
import styled, { keyframes } from 'styled-components';
import * as KEYFRAMES from '../Keyframes';
import atMedia from '../../AtMedia';
import './index.css';
import '../NavTransition/index.scss';

//children
import NavTransition from '../NavTransition';
import HiddenNav from './HiddenNav';
import NavLink from './NavLink';



/***
 * (props.activeView === '' || props.activeView === '/'
            ? css`.4s ${fadeIn} ease-out .3s forwards;`
            : css`.4s ${riseNarrow} ease-out .3s forwards;`)
        : (props.fadeAwayNav
            ? (props.activeView === ''
                ? css`.4s ${fadeOut(props.activeView)} ease-out forwards;`
                : css`.4s ${goDown} ease-out forwards;`)
 */


/**
 * opacity: ${ props => props.displayNav
        ? '1'
        : '1'
    };

    animation: ${props => props.displayNav
        ? `${navRise} 1s ease-out forwards 1`
        : `${navFall} 1s ease-out forwards 1`
    };


     transform: ${props => props.displayNav
        ? 'none'
        : 'translate3d(0,50vh,0)'
    };
 */

const NavigationStyled = styled.div`
    position: fixed;
    bottom: 0;
    background: white;
    
   

    text-align: center;
    width: 100vw;
    overflow: hidden;
    height: 50vw;

    transition: ${props => props.activeView === ''
        ? 'opacity 3s, transform 1.5s cubic-bezier(.2,.1,0,1)'
        : 'opacity .4s, transform .4s ease-out'
    };

   

    ${atMedia([{ key: 'orientation', val: 'landscape' }])`
        max-height: 50vh;
    `};
`;





const Navigation = (props) => {
    // global state/updater
    const { state, dispatch } = useContext(StateContext);

    const { activeView, displayNav } = state;

    // check if link is active
    const isActive = (name) => name === activeView;





    // determine transitionSpeed
    const speed = activeView === '' ? 'slow' : '';

    return (
        <NavTransition displayNav={displayNav}>
            <NavigationStyled className='Navigation' {...state}>
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

                {/* The canvas-animation appears here after compilation... */}
            </NavigationStyled>
        </NavTransition>
    );

}

export default Navigation;



