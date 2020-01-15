import React, { useContext } from 'react';

// Context
import { StateContext } from '../StateContext/index';

// routing
import { Link } from 'react-router-dom';
import * as ROUTES from '../../constants/routes';

// style
import styled from 'styled-components';
import atMedia from '../../AtMedia';

const NavCard = styled.div`
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
    font-size: 6vw;
    ${atMedia([{ key: 'orientation', val: 'landscape' }])`
        font-size: 5vh;
    `};
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
    // destructure props
    const { name, navKey, content } = props;

    // global state/updater
    const { state, dispatch } = useContext(StateContext);
    const { activeView, navAnimation } = state;

    // determine if link is active
    const isActive = view => activeView === view ? 'active' : '';

    // set active view in state
    const handleClick = (e) => {
        /*         state.historyStack.prev.push({path: '/' + name, action: });
                state.historyStack */

        // update active view
        if (name !== activeView) {
            dispatch({ type: 'activeView', payload: name });
        }

        // set navAnim to rise/fall versions
        if (navAnimation.in !== 'navRise') {
            dispatch({ type: 'navAnimation', payload: { in: 'navRise', out: 'navFall' } });
        }
    }


    return (
        <>
            <NavCard className={`NavCard ${name} ${isActive(name)}`}>
                <LinkBtn
                    data-nav-key={navKey}
                    to={ROUTES[name.toUpperCase()]}
                    className={`NavLink ${name} ${isActive(name)}`}
                    onClick={handleClick}
                >
                    {content || name}
                </LinkBtn>
            </NavCard>
        </>
    );
    // }
}

export default NavLink;

