import React, { useContext } from 'react';
import { StateContext } from '../StateContext';
import * as ROUTES from '../../constants/routes';
import Intro from '../Intro';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { CSSTransition } from 'react-transition-group';
import atMedia from '../../AtMedia';




const goHome = e => {
    window.location.pathname = '';
}



const Header = styled.header`
    z-index: 2;
    position: relative;
    top: 0;
    color: black;

    text-align: center;
    padding: 10px 0px;

    transition: .2s;

    font-size: 3em;

    ${atMedia(
    [
        { key: 'orientation', val: 'landscape' },
        { key: 'max-width', val: '680px' }
    ])`
        text-align: center;
        margin-left: ${window.innerWidth * .01 + 10}px
    `}

    font-size: 5em;
    ${atMedia([
        { key: 'max-width', val: '350px' }
    ])`
        font-size: 3em;
    `}
`;



const MainTitle = props => {

    const { state, dispatch } = useContext(StateContext);

    const { freshState, intro, activeView, displayNav } = state;

    // check if link is active
    const isActive = (name) => name === activeView;

    const ConditionalTitle = (() =>
        !intro.a.play
            ? <Link
                to={ROUTES.HOME}
                className={`HomeLink ${isActive('')}`}
                onClick={goHome}
            >
                <CSSTransition
                    in={!freshState && activeView === '' && displayNav}
                    timeout={0}
                >
                    <Header className="MainTitle">
                        {props.title}
                    </Header>
                </CSSTransition>
            </Link>
            : ''
    )();

    return (
        <>
            <Intro />
            {ConditionalTitle}
        </>
    );

}

export default MainTitle;