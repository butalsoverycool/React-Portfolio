import React from 'react';
import styled, { keyframes, css } from 'styled-components';

const Container = styled.div`
    width: 100%;
    padding: 5px;
`;

const fadeToRight = keyframes`
    0%{
        transform: translate3d(0,0,0);
        opacity: 1;
    }100%{
        transform: translate3d(100px,0,0);
        opacity: 0;
    }
`;

const Msg = styled.p`
    font-size: 1.5em;
    font-style: italic;
    color: ${props => props.color || 'black'};
    background: ${props => props.bg || 'none'};

    animation: ${props => props.anim
        ? css`${fadeToRight} 1.6s ease-in infinite`
        : 'none'
    };

`;

const UserMsg = props => {
    const { msg, color, bg, msgClass, containerClass, anim } = props;
    return (
        <Container className={`${containerClass} UserMsgContainer`}>
            <Msg className={`${msgClass} UserMsg`} color={color} bg={bg} anim={anim}>{msg}</Msg>
        </Container>
    );
}

export default UserMsg;