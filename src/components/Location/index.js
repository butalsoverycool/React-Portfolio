import React, { useContext } from 'react';
import { StateContext } from '../StateContext';

const Location = props => {

    const { state, dispatch } = useContext(StateContext);

    const { match, location, history, children } = props;

    const { stateWasReset, historyStack } = state;

    let lastPrev = historyStack.prev.length > 0
        ? historyStack.prev[historyStack.prev.length - 1].path
        : undefined;

    let current = history.location.pathname;

    console.log('lastPrev', lastPrev, 'current', current)
    if (lastPrev === undefined || lastPrev !== current) {
        //if pop and different and lastPrev !== undefined arr.pop() historyStack
        if (history.action === 'POP'
            && lastPrev !== current
            && lastPrev !== undefined
            && historyStack.prev.length > 0) {

            dispatch({ type: 'historyPop' });

            // else add to history
        } else {
            dispatch({
                type: 'historyPush',
                payload: {
                    path: current,
                    action: history.action
                }
            });
        }
    }

    return ('');
}

export default Location;