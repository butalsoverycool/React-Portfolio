import React from 'react';
import styled, { keyframes } from 'styled-components';

// routing
import { Link } from 'react-router-dom';
import * as ROUTES from '../../constants/routes';

// Context
import { StateContext } from '../StateContext/index';


const fadeIn = keyframes`
    0%{
        opacity: 0;
    }100%{
        opacity: 1;
    }
`;




const StyledBtn = styled(Link)`
  position: fixed;
  left: 10px;
  bottom: 10px; 
  background: #FFF;
  font-size: 2em;
  padding: 10px;
  text-decoration: none;
  color: black;
  box-shadow: -5px 5px 20px black;
  opacity: 0;
  animation: ${fadeIn} 2s normal linear forwards 1;
`;


const HomeBtn = props => {
    // global state/updater
    const { state, dispatch } = React.useContext(StateContext);

    // set active view in state
    const handleClick = () => {
        dispatch({ type: 'activeView', payload: '/' })

    }

    return (
        <StyledBtn
            className='HomeBtn'
            to={ROUTES.HOME}
            onClick={handleClick}
        >
            {props.txt || 'home'}
        </StyledBtn>
    );
}

export default HomeBtn;