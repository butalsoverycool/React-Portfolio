import React from 'react';
import { Link } from 'react-router-dom';
import * as ROUTES from '../../constants/routes';
import styled, { keyframes } from 'styled-components';
import responsive from '../../AtMedia/index';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import * as ICONS from '@fortawesome/fontawesome-free-solid'


// Context
import { StateContext } from '../StateContext/index';


const fadeIn = keyframes`
    0%{
        height: 0;
        background: black;
    }100%{
        height: 50px;
        background: white;
    }
`;

const LinkStyled = styled.div`
    cursor: pointer;
    position: fixed;
    z-index: 2;
    left: 0px;
    bottom: 0px; 
    background: black;
    width: 100%;
    height: 0;
    text-align: center;
    line-height: 50px;
    text-decoration: none;
    color: black;
    box-shadow: -2px -2px 100px black;
    font-weight: 700;
    animation: ${fadeIn} .4s normal ease-out forwards 1;
     ${responsive('min-width').navW`
        left: unset;
        right: 0px;
        width: 100px;
        box-shadow: 2px 2px 10px black;
    `};
`;

const IconStyled = styled(FontAwesomeIcon)`
    transform: rotateZ(30deg) skewX(-31deg) translate3d(5px, 5px, 0px);
    font-size: 1.5em;
`;

const NavToggleLink = props => {
    // global state/updater
    const { state, dispatch } = React.useContext(StateContext);

    const { activeView, displayNav } = state;

    // update active view in state
    const handleClick = () => {
        dispatch({ type: 'displayNav', payload: !state.displayNav });
    }

    return (
        <>
            <LinkStyled
                className='NavToggleLink'
                /* to={ROUTES.HOME} */
                onClick={handleClick}
            >
                <IconStyled icon={ICONS.faThLarge} />
            </LinkStyled>
        </>
    );
}

export default NavToggleLink;