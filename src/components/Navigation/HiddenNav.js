import React from 'react';
import styled from 'styled-components';



const Container = styled.div`
    width: inherit;
    height: inherit;
    position: absolute;
`;

const Board = styled.div`
    background: red;
    flex-wrap: wrap;
    margin: auto 24vw;
    opacity: 0;
    margin-top: 30vh;
    position: absolute;
    z-index: 1;
    flex-direction: row;
    width: 649px;
    height: 100vh;
    transform: rotateX(58deg) rotateZ(-45deg);
    /* left: 66px; */
    top: -32vh;
`;

const HiddenNav = props => {
    return (
        <Container className='HiddenNav'>
            <Board className='Board'>
                {props.children}
            </Board>
        </Container>
    );
}

export default HiddenNav;