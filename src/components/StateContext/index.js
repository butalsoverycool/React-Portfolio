import React from 'react';
import { withRouter } from 'react-router';


export const initialState = {
    freshState: true,
    winSize: { w: window.innerWidth, h: window.innerHeight },
    historyStack: { prev: [{ path: window.location.pathname, action: 'POP' }], next: [], history: {} },
    activeView: window.location.pathname.substring(1),
    intro: { play: false, ended: false },
    displayNav: false,
    navAnimation: window.location.pathname === '/'
        ? { in: 'navFadeIn', out: 'navFadeOut' }
        : { in: 'navRise', out: 'navFall' }
};

// State updater
const stateReducer = (state, action) => {
    console.log('CALLING REDUCER');

    // default = prev state
    let newState = {};
    for (let prop in state) {
        newState[prop] = state[prop];
    }

    newState.freshState = false;

    // update state according to given action type/payload
    switch (action.type) {
        case 'resetState':
            console.log(`Reset state (${action.type}): ${newState}`);

            return initialState;

        case 'freshState':
            newState.freshState = action.payload;

            console.log(`Updated state (${action.type}): ${newState.freshState}`);

            return newState;

        case 'winSize':
            newState.winSize = action.payload;

            console.log(`Updated state (${action.type}): ${newState.winSize.w} x ${newState.winSize.h}`);

            return newState;

        case 'historyStack':
            newState.historyStack.prev.push(action.payload);

            console.log(`Updated state (${action.type}): path = ${action.payload.path}, action = ${action.payload.action}`);

            return newState;

        case 'routeHistory':
            newState.historyStack.history = action.payload;

            console.log(`Updated state (${action.type}): ${action.payload}`);

            return newState;

        case 'activeView':
            newState.activeView = action.payload;

            console.log(`Updated state (${action.type}): ${action.payload}`);

            return newState;

        case 'intro':
            let reducerMsg = `Updated state (${action.type}): `;

            for (let status in action.payload) {
                newState.intro[status] = action.payload[status];
                reducerMsg += `${status} = ${action.payload[status]}, `;
            }

            console.log(reducerMsg);

            return newState;

        case 'toggleDisplayNav':

            newState.displayNav = action.payload;

            console.log(`Updated state (${action.type}): ${newState.displayNav}`);

            return newState;

        case 'navAnimation':
            newState.navAnimation = action.payload;

            console.log(`Updated state (${action.type}): IN: ${newState.navAnimation.in} OUT: ${newState.navAnimation.out}`);

            return newState;

        default:
            console.log('Action type undefined. Keeping prev state.');

            return state;
    }
}

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