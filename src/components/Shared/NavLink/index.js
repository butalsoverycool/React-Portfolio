import React, { Component } from 'react';

// routing
import { Link } from 'react-router-dom';
import * as ROUTES from '../../../constants/routes';

// style
import styled from 'styled-components';

const Link_styled = styled(Link)`
    display: block;
    width: 100px;
    margin: 10px;
    line-height: 100px;
    font-size: 1em;
    font-style: italic;
    text-decoration: none;
    background: ${props => props.active === 'true' ? '#DDD' : 'whitesmoke'};
    color: #222;
    border-radius: 10px;
    box-shadow: 1px 0px 5px grey;
    float: left;
    cursor: pointer;
`;

export default class NavLink extends Component {
    constructor(props) {
        super(props);

        this.clickHandler = this.clickHandler.bind(this);

        this.state = {
            isActive: false
        }
    }

    // if isActive-prop was updated, update local state
    componentDidUpdate(nextProps) {
        if (this.props.isActive !== this.state.isActive) {
            this.setState({
                isActive: this.props.isActive
            });
        }
    }

    // active: true, update both app- and local state 
    clickHandler = () => {
        this.props.setActiveView(this.props.name);
    }

    render() {
        return (
            <React.Fragment>
                <Link_styled
                    active={String(this.state.isActive)}
                    to={ROUTES[this.props.name.toUpperCase()]}
                    className={`NavLink ${this.props.name} ${this.state.isActive ? 'active' : ''}`}
                    onClick={this.clickHandler}
                >
                    {this.props.content || this.props.name}
                </Link_styled>
            </React.Fragment>
        );
    }
}

