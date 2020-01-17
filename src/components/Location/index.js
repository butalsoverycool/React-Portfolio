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


    const App = document.querySelector('.App');
    const currentScrollTop = App ? App.scrollTop : null;
    const lastScr = historyStack.prev[historyStack.prev.length - 1].scrollTop;

    if (historyStack.history) {
        if (history.location.pathname !== historyStack.history.location.pathname) {
            dispatch({ type: 'routeHistory', payload: history });
        }
    }

    // Determine scroll-top
    // if action POP, go to latest scrolltop if possible
    if (historyStack.prev[historyStack.prev.length - 1].scrollTop && history.action === 'POP' && currentScrollTop) {
        App.scrollTop = lastScr;
        console.log('Went to last scr-top', lastScr);
        // if PUSH, go to top if possible
    } else if (currentScrollTop && history.action === 'PUSH') {
        App.scrollTop = 0;
    }


    if (latest !== current) {
        dispatch({
            type: 'historyStack',
            payload: { path: history.location.pathname, action: history.action, scrollTop: App.scrollTop || 0 }
        });
        //console.log('latest', latest, 'curr', current, 'location pathname', window.location.pathname);
    }





    //console.log('PROPS match', match, 'location', location, 'history', history);


    return (
        <>
            {children}
        </>
    );
}

export default Location;