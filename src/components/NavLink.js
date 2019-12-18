import React, { Component } from 'react';

// routing
import { Link } from 'react-router-dom';
import * as ROUTES from '../constants/routes';

// style
import styled from 'styled-components';

const LinkContainer_styled = styled.div`
    text-align: center;
`;

const Link_styled = styled(Link)`
    display: block;
    width: 100px;
    margin: 10px;
    line-height: 100px;
    font-size: 1em;
    font-style: italic;
    text-decoration: none;
    background: ${props => props.active === 'true' ? '#CCC' : 'whitesmoke'};
    color: #222;
    border-radius: 10px;
    box-shadow: 1px 0px 5px grey;
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

    componentDidMount() {
        this.setState({
            isActive: this.props.isActive
        });
    }

    // if isActive-prop was updated, update local state
    componentDidUpdate(nextProps) {
        if (this.props.isActive !== this.state.isActive) {
            this.setState({
                isActive: this.props.isActive
            }, () => console.log('updated props', this.props));
        }
    }

    // active: true, update both app- and local state 
    clickHandler = () => {
        this.props.setActiveView(this.props.name);
    }

    render() {
        return (
            <React.Fragment>
                <LinkContainer_styled className={`LinkContainer ${this.props.name} ${this.state.isActive ? 'active' : ''}`}>
                    <Link_styled
                        active={String(this.state.isActive)}
                        to={ROUTES[this.props.name.toUpperCase()]}
                        className={`NavLink ${this.props.name} ${this.state.isActive ? 'active' : ''}`}
                        onClick={this.clickHandler}
                    >
                        {this.props.content || this.props.name}
                    </Link_styled>
                </LinkContainer_styled>
            </React.Fragment>
        );
    }
}

