import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import * as ROUTES from '../../constants/routes';
import { StateContext, initialState } from '../StateContext';
import styled, { keyframes, css } from 'styled-components';
import { CSSTransition } from 'react-transition-group';
import './index.scss';
import atMedia from '../../AtMedia';
import IntroSrc from '../../media/Intro.mp4';
import LogoSrc from '../../media/IntroEndFrame.png';

const Container = styled.div`
    margin: 0;
    width: 100%;
    height: auto;
    text-align: center;
`;

const appear = keyframes`
    0%{
        opacity: 0;
    }100%{
        opacity: 1;
    }
`;

const disappear = keyframes`
    0%{
        opacity: 1;
    }100%{
        opacity: 0;
    }
`;

const minimize = keyframes`
    0%{
        width: 100%;
    }100%{  
        max-width: 200px;
    }
`;

const Video = styled.video`
    width: 100%;
    position: absolute;
    left: 0;
    top: 0;
    opacity: 1;  
    z-index: 2;  
    transform: rotate(-20deg);
`;

const LogoLink = styled(Link)`
    z-index: 2;

    &:hover {
        .Logo {
            width: 170px;
        }
    }
`;

const EndFrame = styled.img`
    left: 0;
    top: 0;
    width: 100%;
    height: auto;
    position: absolute;
    opacity: 0;
    z-index: 0;
    margin: auto;
    transform: rotate(-20deg);

    animation: ${appear} 1s 3s linear forwards 1;
    
    
`;


const Intro = props => {
    const { state, dispatch } = useContext(StateContext);
    const { activeView, intro } = state;

    // check if link is active
    const isActive = (name) => name === activeView;

    const goHome = () => {
        if (activeView !== '') {
            window.location.pathname = '/';
        }
    }

    // set intro A play
    // (if on landing and intro isn't playing and hasn't been played already)
    if (activeView === '' && !intro.play && !intro.ended) {
        dispatch({
            type: 'intro',
            payload: { play: true }
        });
    }

    // intro A conditional render
    const Intro = props => {
        const condition = intro.play ? true : false;
        return intro.play
            ? (<Video type='video/mp4' muted={true} autoPlay playsInline={true} className='Intro' src={IntroSrc} onEnded={introEnded} />)
            : ('');
    }

    // set intro A end
    const introEnded = e => {
        if (intro.play && !intro.ended) {
            dispatch({
                type: 'intro',
                payload: { play: false, ended: true }
            });
        }
    }

    const Logo = () => {
        return activeView === ''
            ? <EndFrame src={LogoSrc} className='Logo' />
            : ('')
    }


    return (
        <Container className='IntroContainer'>
            <Intro />

            <LogoLink
                to={ROUTES.HOME}
                className={`LogoLink ${isActive('')}`}
                onClick={goHome}
            >
                <CSSTransition
                    in={intro.ended}
                    timeout={0}
                >
                    <Logo />
                </CSSTransition>
            </LogoLink>

        </Container >
    );
}

export default Intro;