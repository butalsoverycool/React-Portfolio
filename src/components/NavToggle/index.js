import React, { useContext, useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import * as ROUTES from '../../constants/routes';
import styled, { keyframes, css } from 'styled-components';
import { CSSTransition } from 'react-transition-group';
import './index.scss';
import atMedia from '../../AtMedia';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import * as ICONS from '@fortawesome/fontawesome-free-solid'


// Context
import { StateContext } from '../StateContext/index';


const riseUp = keyframes`
    0%{
        box-shadow: unset;
        transform: translate3d(0, 50px, 0);
    }100%{
        box-shadow: -1px -1px 20px grey; 
        transform: translate3d(0, 0, 0);
    }
`;

const toLeft = keyframes`
    0%{
        transform: translate3d(100px, 0, 0);
    }100%{
        transform: translate3d(0, 0, 0);
    }
`;


/**
 * LINKSTYLED
 * 
 * 
 */

const LinkStyled = styled.div`
    z-index: 2;
    cursor: pointer;
    position: fixed;
    left: 0px;
    bottom: 0px; 
    text-align: center;
    line-height: 50px;
    text-decoration: none;
    color: black;
    box-shadow: -2px -2px 100px black; 
    font-weight: 700;

    background: white;

    width: 100%;
    height: 50px;

    transform: ${props => props.navToggleAnim
        ? 'translate3d(0, 50px, 0)'
        : 'none'
    };
    
    animation: ${props => props.navToggleAnim
        ? css`${riseUp} .4s .4s normal ease-out forwards 1`
        : 'none'
    };
    
    ${atMedia([{ key: 'orientation', val: 'landscape' }])`
        left: unset;
        bottom: unset;
        right: 0;
        top: 0;

        width: 100px;

        box-shadow: unset;

        transform: ${props => props.navToggleAnim
            ? 'translate3d(100px, 0, 0)'
            : 'none'
        };

        animation: ${props => props.navToggleAnim
            ? css`${toLeft} .4s .4s normal ease-out forwards 1`
            : 'none'
        };
    `}; 
`;


const NavToggle = props => {
    // global state/updater
    const { state, dispatch } = useContext(StateContext);

    const { displayNav, historyStack, navAnimation } = state;

    /* const lastIndex = historyStack.prev[historyStack.length - 2] || null;

    console.log('navtoggle lastIndex', lastIndex)
    if (lastIndex) {
        console.log('navtoggle last path', historyStack.prev[lastIndex].path);
    } */

    // toggle displayNav
    const handleClick = () => {
        // displayNav true (false is set on doc-click in app.js)
        if (!displayNav) {
            dispatch({
                type: 'toggleDisplayNav',
                payload: true
            });
        }


        // nav anim to rise/fall versions
        /* if (navAnimation.in !== 'navRise') {
            dispatch({
                type: 'navAnimation',
                payload: {
                    in: 'navRise',
                    out: 'navFall'
                }
            });
        } */
    }

    const IconStyled = styled(FontAwesomeIcon)``;

    // animate icon: displayNav = enter, !displayNav = exit
    const iconAnim = (() =>
        displayNav
            ? true : false
    )();

    // previous path in state
    const prevPage = (() =>
        historyStack.prev.length > 1
            ? historyStack.prev[historyStack.prev.length - 2].path
            : null
    )();

    // animate navToggle only if no history or coming from landing
    const navToggleAnim = (() =>
        historyStack.prev.length <= 1 || prevPage === '/'
            ? true : false
    )();


    return (
        <>
            <LinkStyled
                className='NavToggle'
                onClick={handleClick}
                navToggleAnim={navToggleAnim}
            >
                <CSSTransition
                    in={iconAnim}
                    timeout={500}
                >
                    <IconStyled icon={ICONS.faThLarge} className='NavToggleIcon' />
                </CSSTransition>
            </LinkStyled>
        </>
    );
}

export default NavToggle;