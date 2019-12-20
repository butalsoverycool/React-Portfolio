import React, { useContext} from 'react';
import styled from  'styled-components';
import {Context} from '../App';

const SectionStyled = styled.section`
    width: 100vw;
    height: 100vh;
    display: flex;
    justify-content: space-evenly;
    background-color: ${props => props.theme.container.bg};
    color: ${props => props.theme.container.color};
`;

SectionStyled.defaultProps = {
    theme: {
        container: {
            bg: 'purple',
            color: 'white' 
        }
    }
}

const Section = (props) => {
    const context = useContext(Context);
    return (
        <>
        <SectionStyled theme={props.theme || context.theme} className="Section">
            {props.children}
        </SectionStyled>
        </>
    );
}

export default Section;