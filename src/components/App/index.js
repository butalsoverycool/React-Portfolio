// react
import React, { forwardRef, useContext, useRef, useEffect } from 'react';
//import ReactDOMServer from 'react-dom/server';

// router
import { BrowserRouter as Router, Route, Link, Switch } from 'react-router-dom';
import Location from '../Location';

import {
  BrowserView,
  MobileView,
  isBrowser,
  isMobile
} from "react-device-detect";

// url/route-list
import * as ROUTES from '../../constants/routes';

// global funcs (leave for now)
import { reachedBottom } from '../../logic/functions';

// Context Provider
import { StateContext } from '../StateContext';

//smoothscroll polyfill
import smoothscroll from 'smoothscroll-polyfill';


// shared
import Navigation from '../Navigation';
import Intro from '../Intro';
import WorkView from '../Views/Work';
import StoryView from '../Views/Story';
import MusicView from '../Views/Music';
import ContactView from '../Views/Contact';
import ViewTransition from '../ViewTransition';

// temp
import AjaxAxios from '../AjaxAxios';

// style
import '../ViewTransition/index.scss';
import styled, { css, createGlobalStyle } from 'styled-components';
import GlobalFont from '../../fonts';


smoothscroll.polyfill();




const GlobalStyle = () => {

  const Style = createGlobalStyle`
    .App {
      font-family: 'JosefinSans-Bold', sans-serif;
      font-size: 1.2em;
    }
  `;

  return (
    <>
      <Style />
      <GlobalFont />
    </>
  );

}

const AppContainer = styled.div`
  position: relative;
  width: 100vw;
  height: 100vh;
  overflow-x: hidden;
  display: flex;
  flex-direction: column;
  justify-content:flex-start; /* space-between; */
  background: white;
`;


const App = forwardRef((props, AppRef) => {
  // app state/updater
  const { state, dispatch } = useContext(StateContext);
  const { user, appRef } = state;


  /**
   * WINDOW SIZE
   **************/

  // Sync winSize with state (on winresize)
  const syncWinSize = (timeout = 500) => {

    let doWhenDone;

    window.onresize = () => {
      console.log('Waiting for resizing to finish...');

      // clear the doWhenDone that was set in previous resize-handler-run
      //...(if not more than 500ms ago)
      clearTimeout(doWhenDone);

      // if no resizing happend the last 500ms, do doWhenDone :)
      doWhenDone = setTimeout(() => {

        dispatch({
          type: 'winSize',
          payload: {
            w: window.innerWidth,
            h: window.innerHeight
          }
        });

      }, timeout);

    };

  }
  syncWinSize();

  // determine user.mobile
  if (user.mobile !== isMobile) {
    dispatch({
      type: 'user',
      payload: { mobile: isMobile }
    })
  }


  /**
   * SCROLL
   *********/



  /*   // Display nav if scrolled to bottom
    const displayNavAtBottom = elem => {
      // if at bottom + conditions... display nav
      if (
        reachedBottom(elem)
        && activeView !== ''
        && !isMobile
      ) {
  
        if (!scrolling.bottom) {
  
          dispatch({
            type: 'scrolling',
            payload: { bottom: true }
          })
  
          dispatch({
            type: 'nav',
            payload: { display: true }
          })
  
        }
  
        // if not at bottom or conditions... hide nav
      } else {
  
        if (scrolling.bottom) {
          dispatch({
            type: 'scrolling',
            payload: { bottom: false }
          })
  
          dispatch({
            type: 'nav',
            payload: { display: false }
          })
  
        }
  
      }
    }
  
  
    // Handle App-scroll
    const scrollHandler = (elem, timeout = 500) => {
  
      let doWhenDone;
  
      elem.onscroll = () => {
        console.log('Waiting for scroll to finish...');
  
        // clear the doWhenDone that was set in previous resize-handler-run
        //...(if not more than 500ms ago)
        clearTimeout(doWhenDone);
  
        // if no resizing happend the last 500ms, do doWhenDone :)
        doWhenDone = setTimeout(() => {
  
          displayNavAtBottom(elem);
  
        }, timeout);
  
      };
  
    }

    */

  // AppRef in state
  useEffect(() => {
    if (appRef.ref === undefined) {
      dispatch({
        type: 'appRef',
        payload: {
          ref: AppRef.current
        }
      });
    }
  }, [AppRef.current]);

  if (appRef.ref && AppRef.current) {
    if (appRef.ref.scrollTop !== appRef.setScrollY) {

    }
  }



  return (
    <AppContainer
      ref={AppRef}
      data-active-view={state.activeView}
      className="App"
    >
      <GlobalStyle />


      <Router>
        <Intro />

        {/* VIEWS */}

        {/* Work view */}
        <Route exact path={ROUTES.WORK}>
          {
            ({ match, location, history }) => (
              <>
                <Location match={match} location={location} history={history} />
                <ViewTransition match={match}>
                  <WorkView />
                </ViewTransition>
              </>
            )
          }
        </Route>

        {/* Story view */}
        <Route exact path={ROUTES.STORY}>
          {({ match }) => (
            <ViewTransition match={match}>
              <StoryView />
            </ViewTransition>
          )}
        </Route>

        {/* Music view */}
        <Route exact path={ROUTES.MUSIC}>
          {({ match }) => (
            <ViewTransition match={match}>
              <MusicView />
            </ViewTransition>
          )}
        </Route>

        {/* Contact view */}
        <Route exact path={ROUTES.CONTACT}>
          {({ match }) => (
            <ViewTransition match={match}>
              <ContactView />
            </ViewTransition>
          )}
        </Route>

        <Navigation />

        {/* TEMP AJAX-view */}
        <Route exact path={'/ajax'} component={AjaxAxios} />
      </Router>
    </AppContainer >
  );
});

export default App;