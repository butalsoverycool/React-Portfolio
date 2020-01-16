import React, { useContext, useState, useEffect } from 'react';
import { StateContext } from '../StateContext';
import { CSSTransition } from 'react-transition-group';
import './index.scss';

const NavTransition = props => {
    const { state, dispatch } = useContext(StateContext);
    const { intro, activeView, displayNav } = state;


    const inProp = (() =>
        displayNav && !intro.play
            ? true : false
    )();

    if (activeView === '' && !intro.play && !displayNav) {
        dispatch({
            type: 'toggleDisplayNav',
            payload: true
        });
    }

    return (
        <CSSTransition
            in={inProp}
            timeout={0}
        >
            {props.children}
        </CSSTransition>
    );
}

export default NavTransition;