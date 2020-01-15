import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import * as ROUTES from '../../constants/routes';

import styled from 'styled-components';
import './index.scss';
import { CSSTransition } from 'react-transition-group';

import { StateContext } from '../StateContext';

import HandWrittenTitle from '../Intro';
import atMedia from '../../AtMedia';

const TitleStyled = styled.h2`
    z-index: 2;
    position: relative;
    top: 0;
    color: black;
    
    text-align: ${props => props.align || 'left'};
    padding: 10px 0px;

    transition: .2s;

    font-size: 3em;
`;

const LinkBtn = styled(Link)``;

const Title = (props) => {
    const { state } = useContext(StateContext);
    const { freshState, activeView, titleIntro, displayNav } = state;

    const { type, align, title } = props;

    return (
        <TitleStyled className="Title" type={type} align={align}>
            {title}
        </TitleStyled>
    );
}

export default Title;
