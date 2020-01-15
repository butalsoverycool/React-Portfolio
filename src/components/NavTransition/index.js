import React, { useContext, useState, useEffect } from 'react';
import { StateContext } from '../StateContext';
import { CSSTransition } from 'react-transition-group';
import './index.scss';

const NavTransition = props => {
    const { state, dispatch } = useContext(StateContext);
    const { intro, activeView, titleIntro, displayNav } = state;


    const inProp = (() =>
        displayNav && !intro.a.play
            ? true : false
    )();

    if (activeView === '' && !intro.a.play && !displayNav) {
        dispatch({
            type: 'toggleDisplayNav',
            payload: true
        });
    }

    /* useEffect(() => {
        console.log('navTrans inprop updated:', inProp);
    }, [inProp]); */


    /* const inProp = displayNav && activeView === '' && !titleIntro
        ? true : false;

    if (inProp) {
        console.log('video end navtrans');
    } */


    //console.log('navdisplay is', state.displayNav)
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