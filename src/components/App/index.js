// react
import React, { Component } from 'react';
import ReactDOMServer from 'react-dom/server';

// router
import { BrowserRouter as Router, Route } from 'react-router-dom';

// url/route-list
import * as ROUTES from '../../constants/routes';

// global funcs
import * as FUNCS from '../../logic/functions';

// children
import Navigation from '../Navigation.js';
//import View from '../Views/index';
import HomeView from '../Views/Home.js';
import StoryView from '../Views/Story.js';
import NewsView from '../Views/News.js';
import ContactView from '../Views/Contact.js';
import IntroVideo from '../IntroVideo.js';

// style
import styled, { Keyframes } from 'styled-components';


const App_styled = styled.div`
  width: 100vw;
  height: auto;
  min-height: ${props => (props.winH + 400) + 'px'};
  padding: 100px 0;
`;

export default class App extends Component {
  constructor(props) {
    super(props);

    this.elem = React.createRef();

    this.state = {
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
  setActiveView(name = false) {
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
  }

  /* scrollHandler() {

    //console.log('reached TOPPPP', FUNCS.reachedTop(document.querySelector('.view')));
    //console.log('reached BOTTOM', FUNCS.reachedBottom(document.querySelector('.view')));

  } */

  render() {
    return (
      <App_styled className="App" ref={this.elem} winH={this.state.winSize.h}>
        {/* <IntroVideo
          src='https://s3.amazonaws.com/codecademy-content/courses/React/react_video-fast.mp4'
          isPortrait={this.state.isPortrait}
        /> */}

        <Router>
          <Navigation
            activeView={this.state.activeView}
            setActiveView={this.setActiveView}
          />

          <Route
            path={ROUTES.HOME}
            render={props =>
              <HomeView
                {...props}
                prevNavLink={FUNCS.getLinkElem('contact')}
                nextNavLink={FUNCS.getLinkElem('story')}
                scrollPos={this.state.scrollPos}
                setScrollPos={this.setScrollPos}
              />
            }
          />

          <Route
            path={ROUTES.STORY}
            render={props =>
              <StoryView
                {...props}
                prevNavLink={FUNCS.getLinkElem('home')}
                nextNavLink={FUNCS.getLinkElem('news')}
                scrollPos={this.state.scrollPos}
                setScrollPos={this.setScrollPos}
              />
            }
          />

          <Route
            path={ROUTES.NEWS}
            render={props =>
              <NewsView
                {...props}
                prevNavLink={FUNCS.getLinkElem('story')}
                nextNavLink={FUNCS.getLinkElem('contact')}
                scrollPos={this.state.scrollPos}
                setScrollPos={this.setScrollPos}
              />
            }
          />

          <Route
            path={ROUTES.CONTACT}
            render={props =>
              <ContactView
                {...props}
                prevNavLink={FUNCS.getLinkElem('news')}
                nextNavLink={FUNCS.getLinkElem('home')}
                scrollPos={this.state.scrollPos}
                setScrollPos={this.setScrollPos}
              />
            }
          />
        </Router>
      </App_styled>
    );
  }
}



