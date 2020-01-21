// react
import React, { useContext, useRef, useEffect } from 'react';
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


// temp*
import axios from 'axios';

// url/route-list
import * as ROUTES from '../../constants/routes';

// global funcs (leave for now)
import * as FUNCS from '../../logic/functions';

// Context Provider
import { StateContext } from '../StateContext';


// shared
import Navigation from '../Navigation';
import Intro from '../Intro';
import Title from '../Title';
import HandWrittenTitle from '../Intro';
import NavToggleLink from '../NavToggle';
import NavLink from '../Navigation/NavLink';
import WorkView from '../Views/Work';
import StoryView from '../Views/Story';
import MusicView from '../Views/Music';
import ContactView from '../Views/Contact';
import ViewTransition from '../ViewTransition';


// style
import styled from 'styled-components';
import '../ViewTransition/index.scss';

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



const App = () => {
  // app state/updater
  const { state, dispatch } = useContext(StateContext);
  const { activeView, displayNav, scrolling } = state;

  const elem = useRef(null);


  // temp* POST FUNC
  const testPost = async input =>
    axios.post(
      '/backend',
      input)
      .then(res => res.data)
      .catch(err => err);


  const testInput = {
    name: 'Lord Voldemort',
    work: 'Wizard',
    birthyear: '19..'
  };

  //testPost(testInput);


  // update winSize in state on win resize
  (() => {
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
      }, 500);
    };
  })();

  console.log('mobile:', isMobile);

  const scrollHandler = e => {

    if (FUNCS.reachedBottom() && activeView !== '' && !isMobile) {

      if (!scrolling.bottom) {

        dispatch({
          type: 'scrolling',
          payload: { bottom: true }
        })

        if (!displayNav) {
          dispatch({
            type: 'toggleDisplayNav',
            payload: true
          })
        }

      }

    } else {

      if (scrolling.bottom) {
        dispatch({
          type: 'scrolling',
          payload: { bottom: false }
        })

        if (displayNav) {
          dispatch({
            type: 'toggleDisplayNav',
            payload: false
          })
        }

      }

    }

  }

  // Scroll up on page load?
  if (scrolling.scrollUp) {
    dispatch({
      type: 'scrolling',
      payload: { scrollUp: false }
    });

    if (!elem.current) return;

    elem.current.scrollTop = 0;
  }


  // hide nav if click on App
  const clickHandler = () => {
    if (activeView !== '' && displayNav) {
      dispatch({
        type: 'toggleDisplayNav',
        payload: false
      });
    }
  }

  return (
    <AppContainer
      ref={elem}
      data-active-view={state.activeView}
      className="App"
      onClick={clickHandler}
      onScroll={scrollHandler}
    >

      <Router>
        {/* <Switch> */}
        {/* <Route exact path={ROUTES.HOME}> */}

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
        {/* </Switch> */}

        {/* NAV */}
        <Navigation />
        {/*  </Route> */}
      </Router>

    </AppContainer >
  );
}

export default App;