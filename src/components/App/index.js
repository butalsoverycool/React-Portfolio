// react
import React, { useContext } from 'react';
//import ReactDOMServer from 'react-dom/server';

// router
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

// url/route-list
import * as ROUTES from '../../constants/routes';

// global funcs (leave for now)
//import * as FUNCS from '../../logic/functions';

// Context Provider
import { StateContext } from '../StateContext';

import { CSSTransition } from 'react-transition-group';

// shared
import Navigation from '../Navigation';
import Title from '../Title';
import NavToggleLink from '../NavToggleLink';
import WorkView from '../Views/Work';
import StoryView from '../Views/Story';
import MusicView from '../Views/Music';
import ContactView from '../Views/Contact';
import TransitionTemplate from '../TransitionTemplate';


// style
import styled from 'styled-components';
import '../TransitionTemplate/index.scss';

/***** 
 * 
 * WIP CUSTOM media queries
// media queries helper for styled components
const atMedia = (key, val) => {
  const keyVal = { key: val };
  return Object.keys(keyVal).reduce((acc, label) => {
    console.log('acccc:', acc, 'labelll', label);
    acc[label] = (...args) => {
      
      return css`
      @media (${val}: ${key[label]}) {
         ${css(...args)};
      }
   `
    }
    return acc;
  }, {});
}

console.log('atMedia:', atMedia({ 'max-width': '600px' }));
atMedia('min-width', '600px');
****/


const AppContainer = styled.div`
  width: 100vw;
  height: 100vh;
  overflow-x: hidden;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;

const App = () => {
  const { state, dispatch } = useContext(StateContext);

  const { activeView, displayNav } = state;

  return (
    <AppContainer
      data-active-view={String(activeView)}
      className="App"
    >
      <Title title='Kim Nkoubou' type='main' />

      < Router >
        {/* <Switch> */}
        {/* VIEWS */}

        {/* Work view */}
        <Route exact path={ROUTES.WORK}>
          {({ match }) => (
            <TransitionTemplate match={match}>
              <WorkView />
            </TransitionTemplate>
          )}
        </Route>

        {/* Story view */}
        <Route exact path={ROUTES.STORY}>
          {({ match }) => (
            <TransitionTemplate match={match}>
              <StoryView />
            </TransitionTemplate>
          )}
        </Route>

        {/* Story view */}
        <Route exact path={ROUTES.MUSIC}>
          {({ match }) => (
            <TransitionTemplate match={match}>
              <MusicView />
            </TransitionTemplate>
          )}
        </Route>

        {/* Story view */}
        <Route exact path={ROUTES.CONTACT}>
          {({ match }) => (
            <TransitionTemplate match={match}>
              <ContactView />
            </TransitionTemplate>
          )}
        </Route>
        {/* </Switch> */}

        {/* NAV */}
        <Navigation activeView={activeView} />
      </Router>
    </AppContainer >
  );
}

export default App;