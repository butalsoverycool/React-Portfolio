import React, { useContext } from 'react';
import { StateContext } from '../StateContext';


const Location = props => {
    //console.log('LOCATION', props);

    const { state, dispatch } = useContext(StateContext);

    const { match, location, history, children } = props;

    const { freshState, historyStack, activeView, displayNav } = state;

    const latest = historyStack.prev.length > 0
        ? historyStack.prev[historyStack.prev.length - 1].path
        : null;
    const current = window.location.pathname;


    if (history !== historyStack.history) {
        dispatch({ type: 'routeHistory', payload: history });
    }


    if (latest !== current) {
        dispatch({
            type: 'historyStack',
            payload: { path: history.location.pathname, action: history.action }
        });
    }

    console.log('latest', latest, 'curr', current, 'location pathname', window.location.pathname);

    console.log('PROPS match', match, 'location', location, 'history', history);


    return (
        <>
            {children}
        </>
    );
}

export default Location;