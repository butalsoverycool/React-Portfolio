import React, { Component } from 'react';

// routing
import { Link } from 'react-router-dom';
import * as ROUTES from '../../../constants/routes';

import './index.scss';

export default class NavLink extends Component {
    constructor(props) {
        super(props);
        this.activate = this.activate.bind(this);
    }

    activate = () => {
        this.props.activeView(this.props.name);
    }

    render() {
        return (
            <React.Fragment>
                <Link
                    to={ROUTES[this.props.name.toUpperCase()]}
                    className={`NavLink ${this.props.name}`}
                    onClick={this.activate}
                >
                    <button>{this.props.content || this.props.name}</button>
                </Link>
            </React.Fragment>
        );
    }
}