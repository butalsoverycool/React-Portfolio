import React, { useContext } from 'react';

//Context
import { StateContext } from '../StateContext/index';

// style 
import styled from 'styled-components';
import atMedia from '../../AtMedia';
import '../NavTransition/index.scss';

//children
import NavTransition from '../NavTransition';
import HiddenNav from './HiddenNav';
import NavLink from './NavLink';


const NavigationStyled = styled.div`
    position: fixed;
    bottom: 0;
    background: white;

    text-align: center;
    width: 100vw;
    overflow: hidden;
    height: 50vw;

    transition: ${props => props.activeView === ''
        ? 'opacity 3s, transform 1.5s cubic-bezier(.2,.1,0,1)'
        : 'opacity .4s, transform .4s cubic-bezier(.2,.1,0,1)'
    };

    ${atMedia([{ key: 'orientation', val: 'landscape' }])`
        max-height: 50vh;
    `};
`;





const Navigation = () => {
    // global state/updater
    const { state } = useContext(StateContext);

    const { activeView, nav } = state;

    // check if link is active
    const isActive = (name) => name === activeView;


    return (
        <NavTransition>
            <NavigationStyled className={`Navigation`} {...state}>
                <HiddenNav>
                    <NavLink
                        navKey={0}
                        name='music'
                        isActive={isActive('music')}
                    />
                    <NavLink
                        navKey={2}
                        name='story'
                        isActive={isActive('story')}
                    />
                    <NavLink
                        navKey={1}
                        name='work'
                        isActive={isActive('work')}
                    />
                    <NavLink
                        navKey={3}
                        name='contact'
                        isActive={isActive('contact')}
                    />
                </HiddenNav>

                {/* The canvas-animation appears here after compilation... */}
            </NavigationStyled>
        </NavTransition>
    );

}

export default Navigation;



