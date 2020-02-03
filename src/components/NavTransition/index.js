import React, { useContext } from 'react';
import { StateContext } from '../StateContext';
import { CSSTransition } from 'react-transition-group';
import './index.scss';

const NavTransition = props => {
    const { state, dispatch } = useContext(StateContext);
    const { intro, activeView, nav } = state;


    const inProp = nav.display && (!intro.play || activeView !== '')
        ? true : false;

    if (activeView === '' && !intro.play && !nav.display) {
        dispatch({
            type: 'nav',
            payload: { display: true }
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