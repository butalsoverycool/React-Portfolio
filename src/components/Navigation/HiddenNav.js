import React from 'react';
import styled from 'styled-components';

import responsive from '../../Responsive/index';

const HiddenNavStyled = styled.div`
        width: inherit;
        height: inherit;
        position: absolute;
        left: 0; top: 0;
        display: flex;
        flex-direction: column;
        justify-content: flex-end;
`;

const setBottom = () => {
    const h = window.innerHeight;
    return h / 2 + 'px';
}

const BoardContainer = styled.div`
    width: inherit;
    display: flex;
    justify-content: center;
    ${responsive('max-height').short`
        position: relative;
        top: unset;
        bottom: 1vh;
    `}
    ${responsive('orientation').portrait`
        ${responsive('max-width').narrow`
            position: relative;
            top: unset;
            bottom: 4vh;
            ${responsive('max-height').short`
                position: relative;
                top: unset;
                bottom: 3vh;
            `}
            ${responsive('max-height').veryShort`
                position: relative;
                top: unset;
                bottom: -2vh;
            `}
        `}
    `}
`;

const Board = styled.div`
    opacity: 0;
    background: red;
    z-index: 1;
    width: 50vh;
    height: 50vh;
    margin: 0;
    padding: 0;
    position: relative;
    left: 0;
    top: 0;
    -webkit-transform: rotateX(58deg) rotateZ(-52deg);
    -ms-transform: rotateX(58deg) rotateZ(-52deg);
    -webkit-transform: rotateX(43deg) rotateZ(-46deg);
    -ms-transform: rotateX(43deg) rotateZ(-46deg);
    -webkit-transform: rotateX(44deg) rotateZ(-45deg);
    -ms-transform: rotateX(44deg) rotateZ(-45deg);
    transform: rotateX(44deg) rotateZ(-45deg);
    
    ${responsive('max-width').narrow`
        max-width: 250px;
        max-height: 250px;
    `}
    ${responsive('max-width').veryNarrow`
        max-width: 200px;
        max-height: 200px;
    `}
`;

const HiddenNav = props => {
    return (
        <HiddenNavStyled className='HiddenNav'>
            <BoardContainer className="BoardContainer">
                <Board className='Board'>
                    {props.children}
                </Board>
            </BoardContainer>
        </HiddenNavStyled>
    );
}

export default HiddenNav;