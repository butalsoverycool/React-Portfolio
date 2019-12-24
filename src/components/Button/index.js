import React, { useContext } from 'react';
import { Context } from '../App';
import styled from 'styled-components';

const ButtonStyled = styled.button`
    flex: 1 0 31%;
    width: 100px;
    height: 80px;
    margin: 10px;
    border-radius: 10px;
    background: ${props => props.theme.button.bg};
    color: ${props => props.theme.button.color};
    font-size: 2em;
    outline: none;
`;

const Button = (props) => {
    const context = useContext(Context);
    return (
        <ButtonStyled theme={props.theme || context.theme} onClick={context[props.action]}>
            {props.children}
        </ButtonStyled>
    );
}

export default Button;