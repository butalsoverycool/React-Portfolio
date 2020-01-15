import React from 'react';
import { CSSTransition } from 'react-transition-group';
import './index.scss';

const ViewTransition = props => {

    return (
        <CSSTransition
            in={props.match != null}
            timeout={0}
            unmountOnExit
        >
            {props.children}
        </CSSTransition>
    );
}

export default ViewTransition;