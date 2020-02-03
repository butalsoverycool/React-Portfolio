import React, { useContext } from 'react';
import styled, { keyframes, css } from 'styled-components';
import { CSSTransition } from 'react-transition-group';
import './index.scss';
import atMedia from '../../AtMedia';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import * as ICONS from '@fortawesome/fontawesome-free-solid';

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

const Btn = styled.div`
    z-index: 2;
    cursor: pointer;
    position: fixed;
    left: 0px;
    bottom: 0px; 
    text-align: center;
    line-height: 50px;
    text-decoration: none;
    color: black;
    box-shadow: -2px 6px 10px black;
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
        right: 0;
        bottom: 0;

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

    const { nav, historyStack } = state;


    const toggleNav = () => {
        dispatch({
            type: 'nav',
            payload: { display: !nav.display }
        });
    }

    // toggle nav.display
    const clickHandler = () => {
        toggleNav();
    }

    // previous path in state
    const prevPage = historyStack.prev.length > 1
        ? historyStack.prev[historyStack.prev.length - 2].path
        : null;

    // animate navToggle only if no history or coming from landing
    const navToggleAnim =
        historyStack.prev.length <= 1 || prevPage === '/'
            ? true : false;

    const Icon = styled(FontAwesomeIcon)``;

    return (
        <>
            <Btn
                className='NavToggle'
                onClick={clickHandler}
                navToggleAnim={navToggleAnim}
            >
                <CSSTransition
                    in={nav.display}
                    timeout={500}
                >
                    <Icon icon={ICONS.faThLarge} className='NavToggleIcon' />
                </CSSTransition>
            </Btn>
        </>
    );
}

export default NavToggle;