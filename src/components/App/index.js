// react
import React, { useContext } from 'react';
//import ReactDOMServer from 'react-dom/server';

// router
import { BrowserRouter as Router, Route } from 'react-router-dom';

// url/route-list
import * as ROUTES from '../../constants/routes';

// global funcs
//import * as FUNCS from '../../logic/functions';

// Context Provider
import { StateContext } from '../StateContext/index';

// children
import Navigation from '../Navigation/index';
import Title from '../Title/index';
//import View from '../Views/index';
import WorkView from '../Views/Work/index';
import StoryView from '../Views/Story/index';
import MusicView from '../Views/Music/index';
import ContactView from '../Views/Contact/index';
//import IntroVideo from '../IntroVideo/index';

// style
import styled from 'styled-components';
import '../Animation/index.css';


// transition
import { CSSTransition } from 'react-transition-group';
//import { Transition } from 'react-transition-group';



const Container = styled.div`
  width: 100vw;
  height: 100vh;
  overflow-x: hidden;
`;



const App = () => {

  const { state, dispatch } = useContext(StateContext);

  return (
    /*  <StateProvider> */
    <Container
      data-active-view={String(state.activeView)}
      className="App"
      winH={state.winSize.h}
    >

      < Router >
        <Title title='Kim Nkoubou' type='main' />




        {/* <Route exact path={ROUTES.HOME}>
          {({ match }) => (
            <CSSTransition
              in={match != null}
              timeout={1000}
              classNames="NavCont page"
            
            >
              <div className="NavCont page"> */}
        <Navigation activeView={state.activeView} />
        {/* </div>
            </CSSTransition>
          )}
        </Route> */}


        <Route /*key={path}*/ exact path={ROUTES.WORK}>
          {({ match }) => (
            <CSSTransition
              in={match != null}
              timeout={1000}
              classNames="Work page"
              unmountOnExit
            >
              <div className="Work page">
                <WorkView
                  name={'work'}
                /* {...props} */
                />
              </div>
            </CSSTransition>
          )}
        </Route>

        <Route /*key={path}*/ exact path={ROUTES.STORY}>
          {({ match }) => (
            <CSSTransition
              in={match != null}
              timeout={1000}
              classNames="Story page"
              unmountOnExit
            >
              <div className="Story page">
                <StoryView
                  name={'story'}
                /* {...props} */
                />
              </div>
            </CSSTransition>
          )}
        </Route>
        <Route /*key={path}*/ exact path={ROUTES.MUSIC}>
          {({ match }) => (
            <CSSTransition
              in={match != null}
              timeout={1000}
              classNames="Music page"
              unmountOnExit
            >
              <div className="Music page">
                <MusicView
                  name={'music'}
                /* {...props} */
                />
              </div>
            </CSSTransition>
          )}
        </Route>
        <Route /*key={path}*/ exact path={ROUTES.CONTACT}>
          {({ match }) => (
            <CSSTransition
              in={match != null}
              timeout={1000}
              classNames="Contact page"
              unmountOnExit
            >
              <div className="Contact page">
                <ContactView
                  name={'contact'}
                /* {...props} */
                />
              </div>
            </CSSTransition>
          )}
        </Route>



        {/* <Route
          path={ROUTES.WORK}
          render={props =>
            <WorkView
              name={'work'}
              {...props}
            />
          }
        />

        <Route
          path={ROUTES.STORY}
          render={props =>
            <StoryView
              name={'story'}
              {...props}
            />
          }
        />

        <Route
          path={ROUTES.MUSIC}
          render={props =>
            <MusicView
              name={'music'}
              {...props}
            />
          }
        />

        <Route
          path={ROUTES.CONTACT}
          render={props =>
            <ContactView
              name={'contact'}
              {...props}
            />
          }
        /> */}


      </Router>
    </Container>
    /* </StateProvider> */
  );
  //}
}


export default App;







/* constructor(props) {
  super(props);

  this.elem = React.createRef();

  /* this.state = {
    logged_in: false,
    activeView: null,
    scrollPos: 0,
    winSize: {
      w: window.innerWidth,
      h: window.innerHeight
    },
    isPortrait: false
  };

  //this.scrollHandler = this.scrollHandler.bind(this);
  this.resizeHandler = this.resizeHandler.bind(this);
  this.setWinSize = this.setWinSize.bind(this);
  this.setActiveView = this.setActiveView.bind(this);
  this.setScrollPos = this.setScrollPos.bind(this);
  this.scrollToPos = this.scrollToPos.bind(this);
  this.setOrientation = this.setOrientation.bind(this);
}

componentDidMount() {
  this.setActiveView();

  this.setWinSize();

  this.setScrollPos(100);

  this.setOrientation();

  window.addEventListener('scroll', this.scrollHandler);
  window.addEventListener('resize', this.resizeHandler);
}


// clean up ears
componentWillUnmount() {
  window.removeEventListener('resize', this.resizeHandler);
  window.removeEventListener('scroll', this.scrollHandler);
}

componentDidUpdate() {
  this.scrollToPos();
}


// set/update current view
const setActiveView = (name = false) => {
  const active = name ? name : FUNCS.getCurrentView();

  this.setState({
    activeView: active
  }, () => console.log('Updated active view in app:', name));
}


// get start scroll pos
setScrollPos(val) {
  this.setState({
    scrollPos: val
  });
}

scrollToPos() {
  window.scrollTo(0, this.state.scrollPos);
  console.log('scrolled to', this.state.scrollPos)
}


setWinSize() {
  this.setState({
    winSize: {
      w: window.innerWidth,
      h: window.innerHeight
    }
  });
}

// get current orientation
isPortrait() {
  return window.innerHeight > window.innerWidth * .57;
}

// set/update orientation in state to auto-rerendering
setOrientation() {
  this.setState({
    isPortrait: this.isPortrait()
  });
}

resizeHandler() {
  this.setOrientation();
  this.setWinSize();
} */

/* scrollHandler() {

  //console.log('reached TOPPPP', FUNCS.reachedTop(document.querySelector('.view')));
  //console.log('reached BOTTOM', FUNCS.reachedBottom(document.querySelector('.view')));

} */

//render() {

