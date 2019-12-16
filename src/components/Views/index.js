import React, { Component } from 'react';

import styled, { keyframes } from 'styled-components';


const fadeIn = keyframes`
    0%{
        opacity: 0;
    }100%{
        opacity: 1;
    }
`;

// export to apply on all views
export const View_styled = styled.main`
    width: inherit;
    height: inherit;
    opacity: 0;
    animation: ${fadeIn} 1s normal linear forwards 1;
`;

const View = (props) => {
    return (
        <props.view
            {...props}
            prevNavLink={document.querySelector(`.NavLink.${props.prevView}`)}
            nextNavLink={document.querySelector(`.NavLink.${props.nextView}`)} />
    );
}

export default View;