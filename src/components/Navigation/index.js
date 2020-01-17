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

/**
 * transition: ${props => props.activeView === ''
        ? 'opacity 3s, transform 1.5s cubic-bezier(.2,.1,0,1)'
        : 'opacity .4s, transform .4s cubic-bezier(.2,.1,0,1)'
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
        : 'opacity .4s, transform .4s cubic-bezier(.2,.1,0,1)'
    };

    ${atMedia([{ key: 'orientation', val: 'landscape' }])`
        max-height: 50vh;
    `};
`;





const Navigation = (props) => {
    // global state/updater
    const { state, dispatch } = useContext(StateContext);

    const { activeView, displayNav, delayDisplayNav } = state;

    // check if link is active
    const isActive = (name) => name === activeView;


    /* if (delayDisplayNav) {
        dispatch({
            type: 'delayDisplayNav',
            payload: false
        });

        dispatch({
            type: 'toggleDisplayNav',
            payload: true
        });

        setTimeout(() => {
            dispatch({
                type: 'toggleDisplayNav',
                payload: false
            });
        }, 100);
    } */


    /* // determine transitionSpeed
    const speed = activeView === '' ? 'slow' : '';

    let delayClass = delayDisplayNav ? 'delay' : 'none';

    if (delayDisplayNav) {
        setTimeout(() => {
            dispatch({
                type: 'delayDisplayNav',
                payload: false
            });
        }, 400);
    } */

    return (
        <NavTransition displayNav={displayNav}>
            <NavigationStyled className={`Navigation`} {...state}>
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



