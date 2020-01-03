import React, { useContext } from 'react';
import styled from 'styled-components';
import { Context } from '../App/index(old)';

const SectionStyled = styled.section`
    width: inherit;
    height: inherit;
    display: flex;
    justify-content: space-evenly;
    flex-direction: row;
    flex-wrap: wrap;
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