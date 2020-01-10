import React from 'react';
import { CSSTransition } from 'react-transition-group';
import './index.scss';

const TransitionTemplate = props => {
    return (
        <CSSTransition
            in={props.match != null}
            timeout={1000}
            unmountOnExit
        >
            {props.children}
        </CSSTransition>
    );
}

export default TransitionTemplate;