import React from 'react';

// State updater
const stateReducer = (state, action) => {
    // default = prev state
    let newState = {};
    for (let prop in state) {
        newState[prop] = prop;
    }

    // update state according to given action type/payload
    switch (action.type) {
        case 'activeView':
            newState.activeView = action.payload;
            console.log(`Updated state (${action.type}): ${action.payload}`);

            // also update displayNav
            if (newState.activeView === ''
                || newState.activeView === '/') {
                newState.displayNav = true;
            } else {
                newState.displayNav = false;
            }

            console.log(`Also updated state (displayNav): ${newState.displayNav}`);

            return newState;

        case 'displayNav':
            newState.displayNav = action.payload;
            console.log(`Updated state (${action.type}): ${newState.displayNav}`);

            // also activate fadeNav
            newState.fadeAwayNav = true;
            console.log(`Also updated state (fadeAwayNav): ${newState.fadeAwayNav}`);

            return newState;
        default:
            console.log('Action type undefined. Keeping prev state.');
            return newState;
    }
}

const initialState = {
    activeView: window.location.pathname.substring(1),
    displayNav: window.location.pathname === '' || window.location.pathname === '/',
    fadeAwayNav: false
};

const StateContext = React.createContext(initialState);

const StateProvider = props => {
    const [state, dispatch] = React.useReducer(stateReducer, initialState);

    return (
        // sending the state and its updater-func with the provider-component wrapping App
        <StateContext.Provider value={{ state, dispatch }}>
            {props.children}
        </StateContext.Provider>
    );
}

export { StateContext, StateProvider };