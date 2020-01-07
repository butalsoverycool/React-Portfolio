import React from 'react';

// Context
import { StateContext } from '../StateContext/index';

// routing
import { Link } from 'react-router-dom';
import * as ROUTES from '../../constants/routes';

// style
import styled from 'styled-components';

const Card = styled.div`
    text-align: center;
    width: 50%;
    height: 50%;
    float: left;
`;

const LinkBtn = styled(Link)`
    display: block;
    width: 100%;
    height: 100%;
    margin: 0;
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

//export default class NavLink extends Component {
/* constructor(props) {
    super(props);

    this.clickHandler = this.clickHandler.bind(this);

    this.state = {
        isActive: false
    }
} */

/* componentDidMount() {
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
} */

//render() {

const NavLink = props => {
    // global state/updater
    const { state, dispatch } = React.useContext(StateContext);

    // set active view in state
    const handleClick = (e) => {
        dispatch({ type: 'activeView', payload: props.name });
    }

    return (
        <React.Fragment>
            <Card className={`Card ${props.name} ${props.isActive ? 'active' : ''}`}>
                <LinkBtn
                    data-nav-key={String(props.navKey)}
                    active={String(props.isActive)}
                    to={ROUTES[props.name.toUpperCase()]}
                    className={`NavLink ${props.name} ${props.isActive ? 'active' : ''}`}
                    onClick={handleClick}
                >
                    {props.content || props.name}
                </LinkBtn>
            </Card>
        </React.Fragment >
    );
    // }
}

export default NavLink;

