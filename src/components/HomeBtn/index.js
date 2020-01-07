import React from 'react';
import styled from 'styled-components';

// routing
import { Link } from 'react-router-dom';
import * as ROUTES from '../../constants/routes';

// Context
import { StateContext } from '../StateContext/index';

const StyledBtn = styled(Link)`
  position: fixed;
  left: 10px;
  bottom: 10px; 
  background: #FFF;
  font-size: 1.5em;
  padding: 10px;
`;


const HomeBtn = props => {
    // global state/updater
    const { state, dispatch } = React.useContext(StateContext);

    // set active view in state
    const handleClick = () => {
        dispatch({ type: 'activeView', payload: '' })
    }

    return (
        <StyledBtn
            className='HomeBtn'
            to={ROUTES.HOME}
            onClick={handleClick}
        >
            {props.txt || 'Home'}
        </StyledBtn>
    );
}

export default HomeBtn;