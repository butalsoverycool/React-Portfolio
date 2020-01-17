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
import { interpolate } from 'gsap';



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



const Container = styled.div`
    z-index: 2;
    margin: 0;
    width: ${props => props.condition ? '100%' : '160px'};
    height: auto;
    text-align: center;
    position: relative;
    
    right: ${props => props.condition ? '0' : '-40px'};
    top: ${props => props.condition ? '0' : '-20px'};
    height: auto;
    position: absolute;
    /* transform: rotate(20deg); */

    
    transition-duration: 1.5s;
    transition-timing-function: cubic-bezier(.2,.1,.1,1);
`;

const Video = styled.video`
    width: 100%;
    height: 100%;
    position: absolute;
    opacity: 1;  
    z-index: 1;  
`;

const LogoLink = styled(Link)`
    width: 100%;
    height: 100%;
    z-index: 0;
    transform: rotate(-20deg); 
`;

/**
 * animation: ${appear} 1s 3s linear forwards 1;
 */

const EndFrame = styled.img`
    width: 100%;
    height: auto;
    transition: .4s;

    &:hover {
        
            transform: scale(1.1);
        
    }

    opacity: ${props => props.condition ? '0' : '1'};
    animation: ${props => props.condition ? css(['', ' 1s 3s linear forwards 1'], appear) : 'none'};
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
        return (
            <EndFrame src={LogoSrc} className='Logo' condition={intro.play} />
        );
    }


    return (
        <CSSTransition
            in={intro.ended || activeView !== ''}
            timeout={0}
        >
            <Container className='LogoContainer' condition={activeView === ''}>
                <Intro />


                <LogoLink
                    to={ROUTES.HOME}
                    className={`LogoLink ${isActive('')}`}
                    onClick={goHome}
                >

                    <Logo />
                </LogoLink>
            </Container>
        </CSSTransition>
    );
}

export default Intro;