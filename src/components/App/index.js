import React, { useEffect, useReducer } from 'react';
import styled from 'styled-components';

const initialState = {
    count: 0,
    color: 'pink'
};

const reducer = (state, action) => {
    let newState = {};
    for (let item in state) {
        newState[item] = item;
    }

    switch (action.type) {
        case 'inc':
            newState.count = state.count + 1;
            return newState;
        case 'dec':
            newState.count = state.count - 1;
            return newState;
        case 'color':
            newState.color = action.color || 'none';
            return newState;
        default:
    }
}

const ColorDiv = styled.div`
    background: ${props => props.color || 'none'};
    width: 100vw;
    height: 100vh;
`;


const Counter = () => {
    const inputEl = React.useRef(null);

    const [state, action] = useReducer(reducer, initialState);

    React.useEffect(() => {
        console.log('updated state')
    })

    return (
        <ColorDiv color={state.color}>

            <input ref={inputEl} onChange={() => action({ type: 'color', color: inputEl.current.value || 'none' })} />
            Color: {state.color}

            Count: {state.count}
            <button onClick={() => action({ type: 'inc' })}>+</button>
            <button onClick={() => action({ type: 'dec' })}>-</button>
            <button onClick={() => action({ type: '?' })}>?</button>
        </ColorDiv>
    );
}

const App = () => {
    return (
        <Counter />
    )
}

export default App;