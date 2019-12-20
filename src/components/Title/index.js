import React, { useContext } from 'react';
import styled from 'styled-components';
import { Context } from '../App';

const TitleStyled = styled.header`
  color: ${props => props.theme.header.color};
  font-size: 2em;
`;

const Title = (props) => {
    const context = useContext(Context);

   return (
     <TitleStyled theme={context.theme}>
       <h1>
       {props.children}
       </h1>
     </TitleStyled>
   );
}

export default Title;