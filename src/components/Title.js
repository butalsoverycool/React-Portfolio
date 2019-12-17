import React, { Component } from 'react';

// style
import styled from 'styled-components';

const Title_styled = styled.header`
    z-index: 2;
    position: absolute;
    width: 20vw;
    left: 40vw;
    top: 45vh;
    color: purple;
    font-size: 3em;
    text-align: center;
`;

const Title = (props) => {
    return (
        <React.Fragment>
            <Title_styled className="Title">{props.text}</Title_styled>
        </React.Fragment>
    );
}

export default Title;
