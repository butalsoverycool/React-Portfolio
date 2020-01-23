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
    outline: none;

    text-align: center;
    width: 50%;
    height: 50%;
    float: left;
`;

const LinkBtn = styled(Link)`
    outline: none;
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


const NavLink = props => {
    // destructure props
    const { name, navKey, content } = props;

    // global state/updater
    const { state, dispatch } = useContext(StateContext);
    const { activeView, intro, nav, scrolling } = state;

    // determine if link is active
    const isActive = view => activeView === view ? 'active' : '';

    // set active view in state
    const clickHandler = e => {

        // update active view
        if (name !== activeView) {
            dispatch({ type: 'activeView', payload: name });
        }

        // reset intro-status
        if (intro.play || intro.ended) {
            dispatch({
                type: 'intro',
                payload: { play: false, ended: false }
            });
        }

        // set navAnim to rise/fall versions
        if (nav.animation.in !== 'navRise') {
            dispatch({
                type: 'nav', payload: {
                    animation: {
                        in: 'navRise',
                        out: 'navFall'
                    }
                }
            });
        }

        // hide nav
        if (nav.display) {
            dispatch({
                type: 'nav',
                payload: { display: false }
            });
        }

        // save scrollPos
        if (name !== activeView) {
            const elem = document.querySelector('.App');
            dispatch({ type: 'lastScrollPos', payload: elem.scrollTop });
        }

        // scroll to top on next page
        if (!scrolling.scrollUp) {
            dispatch({
                type: 'scrolling',
                payload: { scrollUp: true }
            });
        }
    }


    return (
        <>
            <NavCard className={`NavCard ${name} ${isActive(name)}`}>
                <LinkBtn
                    data-nav-key={navKey}
                    to={ROUTES[name.toUpperCase()]}
                    className={`NavLink ${name} ${isActive(name)}`}
                    onClick={clickHandler}
                >
                    {content || name}
                </LinkBtn>
            </NavCard>
        </>
    );
}

export default NavLink;

