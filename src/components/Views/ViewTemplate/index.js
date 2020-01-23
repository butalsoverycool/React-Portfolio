import React, { forwardRef, createRef, useEffect, useContext } from 'react';
import { StateContext } from '../../StateContext'
import styled from 'styled-components';
import atMedia from '../../../AtMedia';
import NavToggle from '../../NavToggle';
import ViewTitle from '../../ViewTitle';
import { someTxt } from './Lorem';


const Paragraph = styled.p`
    font-size: 1.2em;
    text-align: left;
    line-height: 2em;
    padding: 10px 0px;
`;

export const Lorem = props => {
    return props.printLorem
        ? (
            someTxt.map((part, nth) => <Paragraph key={nth}>{part}</Paragraph>)
        )
        : null;
}

export const StyledContainer = styled.div`
    width: 95%;
    max-width: 650px;
    padding: 10px;
    height: auto;
    margin: auto;
    margin-bottom: 200px;
    ${atMedia([{ key: 'max-width', val: '420px' }])`
        width: 90%;
        padding: 0;
    `}
`;

// export to apply on all views
const Template = styled.main`
    width: 100vw;
    position: absolute;
    left: 0;
    top: ${props => props.displayNav && props.activeView !== 'music' ? '-50px' : '0'};
    filter: ${props => props.displayNav ? 'blur(5px)' : 'none'};
    transition: .4s;
`;

const ContentContainer = forwardRef((props, ref) => {
    const { state, dispatch } = useContext(StateContext);
    const { activeView, nav } = state;

    // hide nav if click on App
    const hideNav = () => {
        if (activeView !== '' && nav.display) {
            dispatch({
                type: 'nav',
                payload: { display: false }
            });
        }
    }

    const clickHandler = () => {
        hideNav();
    }


    return (
        <StyledContainer
            className='ContentContainer'
            ref={ref}
            onClick={clickHandler}
        >
            {props.children}
        </StyledContainer>
    );
});

const ViewTemplate = props => {
    const { printLorem, children } = props;

    const { state } = useContext(StateContext);
    const { activeView, nav } = state;

    const capitalize = (word) => {
        if (typeof word !== 'string') return ''
        return word.charAt(0).toUpperCase() + word.slice(1)
    }

    const viewCap = capitalize(activeView);




    const ContainerRef = createRef();

    return (
        <>
            <Template
                className={`${viewCap}View view`}
                activeView={activeView}
                displayNav={nav.display}
            >
                <ContentContainer ref={ContainerRef} >
                    <ViewTitle view={props.view} />
                    {children}
                    <Lorem printLorem={printLorem} />
                </ContentContainer>
            </Template>
            <NavToggle />
        </>
    );
}

export default ViewTemplate;