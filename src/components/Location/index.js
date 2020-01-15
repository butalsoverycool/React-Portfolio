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

    //console.log('Location hiiistory', { path: history.location.pathname, action: history.action });

    //console.log('latest', latest, 'current', current);

    if (history !== historyStack.history) {
        dispatch({ type: 'routeHistory', payload: history });
    }


    if (latest !== current) {
        dispatch({
            type: 'historyStack',
            payload: { path: history.location.pathname, action: history.action }
        });
    }

    /* console.log('Location historyStack', historyStack.prev); */

    /* const lastIndex = historyStack.prev[historyStack.length - 2] || null;
    
    
    const cameFromLanding = (() => !lastIndex
        ? false
        : (historyStack.prev[lastIndex].path === '/'
            ? true : false)
    )();
    
    //console.log('win path',window.location.pathname,'state path', history.path)
    if (!freshState
        //&& !displayNav
        && (history.action === 'PUSH' || activeView === '')
        && window.location.pathname !== history.location.pathname
        && window.location.pathname !== historyStack.prev[historyStack.prev.length - 2].path) {
        dispatch({
            type: 'historyStack',
            payload: history
        });
        /* historyStack.prev.push({
            path: window.location.pathname,
            action: history.action
        }); 
        //console.log('HISTORY', historyStack.prev);
    } */



    // when back, display nav

    // when pop, but not refresh
    //console.log('history stack pre', historyStack);

    /*  if ((latest !== current || !latest)) {
         //historyStack.push(current);
     } */

    //console.log('activeView', activeView);

    if (window.location.pathname === '/' && !displayNav) {
        //console.log('POOOPED');
        /* dispatch({
            type: 'toggleDisplayNav',
            payload: true
        }); */
    }
    /* else if (window.location.pathname !== '/' && displayNav) {
        dispatch({
            type: 'toggleDisplayNav',
            payload: false
        });
    } */

    //console.log(history);
    //console.log('history stack post', historyStack);

    /* if (latest === current) {
        historyStack.pop();
    } */

    /* if (latest != null && activeView === '' && history.action === 'POP') {
        console.log('POPPPED!')
        dispatch({
            type: 'toggleDisplayNav',
            payload: true
        });
        historyStack.next.unshift(latest);
        historyStack.pop();
    } */

    /*
    if (1 === 2) {
        console.log('yooola')
        dispatch({
            type: 'displayNav',
            payload: true
        });
    } */


    //console.log('latest', latest, 'current', current);


    /* if (latest !== current) {
        //historyStack.push(history.location.pathname);
        if (latest && history.action === 'POP') {
     
            historyStack.pop();
     
            console.log('history pop!')
            console.log('latest', latest, 'current', current);
            console.log('history stack', historyStack);
     
            /* dispatch({
                type: 'locationPopped',
                payload: true
            }); 
        }
    } */






    return (
        <>
            {children}
        </>
    );
}

export default Location;