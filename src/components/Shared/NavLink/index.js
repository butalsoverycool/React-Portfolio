import React from 'react';

// routing
import { Link } from 'react-router-dom';
import * as ROUTES from '../../../constants/routes';

import './index.scss';

const NavLink = (props) => {
    const activate = () => {
        props.activeView(props.name);
    }

    return (
        <React.Fragment>
            <Link
                to={ROUTES[props.name.toUpperCase()]}
                className={`NavLink ${props.name}`}
                onClick={activate}
            >
                <button>{props.content || props.name}</button>
            </Link>
        </React.Fragment>
    );
}

export default NavLink;
