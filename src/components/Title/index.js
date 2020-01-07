import React from 'react';

// style
import styled from 'styled-components';



const TitleStyled = styled.header`
    z-index: 2;
    position: relative;
    top: 0;
    color: black;
    font-size: ${props => props.type === 'main' ? '5em' : '3em'};
    text-align: center;
`;

const Title = (props) => {
    return (
        <React.Fragment>
            <TitleStyled className="Title" type={props.type}>{props.title}</TitleStyled>
        </React.Fragment>
    );
}

export default Title;
