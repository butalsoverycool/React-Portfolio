import React, { Component } from 'react';

// routing
import { Link } from 'react-router-dom';
import * as ROUTES from '../../../constants/routes';

import './index.scss';

const NavLink = (props) => {
    return (
        <React.Fragment>
            <Link
                to={ROUTES[props.destination.toUpperCase()]}
                className={`NavLink ${props.destination}`}
            >
                <button>{props.content || props.destination}</button>
            </Link>
        </React.Fragment>
    );
}

export default NavLink;
