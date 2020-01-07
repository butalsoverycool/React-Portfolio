import React from 'react';

const stateReducer = (state, action) => {
    // newstate default
    let newState = {};
    for (let prop in state) {
        newState[prop] = prop;
    }

    // update state according to given action type/payload
    switch (action.type) {
        case 'loggedIn':
            newState.logged_in = action.payload || !state.logged_in;
            return newState;
        case 'activeView':
            newState.activeView = action.payload;
            console.log('state', newState);
            return newState;
        case 'scrollPos':
            newState.scrollPos = action.payload;
            return newState;
        case 'winSize':
            newState.winSize.x = action.payload.x || state.winSize.x;
            newState.winSize.y = action.payload.y || state.winSize.y;
            return newState;
        case 'isPortrait':
            newState.isPortrait = action.payload || !state.isPortrait;
            return newState;
        default:
            console.log('Action type undefined. Keeping current state.');
            return newState;
        //throw new Error('App state\'s action type was not defined. (App/index.js:71)');
    }
}

const initialState = {
    logged_in: false,
    activeView: window.location.pathname.substring(1),
    scrollPos: 0,
    winSize: {
        w: window.innerWidth,
        h: window.innerHeight
    },
    isPortrait: false
};

const StateContext = React.createContext(initialState);

const StateProvider = props => {
    const [state, dispatch] = React.useReducer(stateReducer, initialState);

    return (
        <StateContext.Provider value={{ state, dispatch }}>
            {props.children}
        </StateContext.Provider>
    );
}

export { StateContext, StateProvider };