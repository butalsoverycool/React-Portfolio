import React, { useContext } from 'react';
import { StateContext, initialState } from '../StateContext';
import styled from 'styled-components';
import atMedia from '../../AtMedia';
import videoSrc from '../../media/HandWrittenTitle.mp4';

const Container = styled.div`
    margin: auto;
    width: 680px;
    max-width: 680px;
    ${atMedia([{ key: 'max-width', val: '680px' }])`
        width: 100vw;
        margin: 0;
    `};
`;

const VideoA = styled.video`
    width: 100%;
`;

const Intro = props => {
    const { state, dispatch } = useContext(StateContext);
    const { activeView, intro } = state;

    // if on landing and intro isn't playing and hasn't been played already, set play-status for intro
    if (activeView === '' && !intro.a.play && !intro.a.ended) {
        dispatch({
            type: 'intro',
            payload: { a: { play: true } }
        });
    }

    // on intro-end, update intro status
    const endHandler = e => {
        if (intro.a.play && !intro.a.ended) {
            dispatch({
                type: 'intro',
                payload: { a: { play: false, ended: true } }
            });
        }
    }

    return activeView === '' && intro.a.play && !intro.a.ended
        ? (
            <Container className='IntroContainer'>
                <VideoA className='Intro' src={videoSrc} autoPlay={true} muted={true} onEnded={endHandler} />
            </Container>
        )
        : ('')
}

export default Intro;