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
import View from '../Views/index';
import HomeView from '../Views/Home.js';
import StoryView from '../Views/Story.js';
import NewsView from '../Views/News.js';
import ContactView from '../Views/Contact.js';
import IntroVideo from '../IntroVideo.js';

// style
import styled, { Keyframes } from 'styled-components';

const App_styled = styled.div`
  width: 100vw;
  height: 100vh;
  min-height: 110vh;
`;

export default class App extends Component {
  constructor(props) {
    super(props);

    this.setActiveView = this.setActiveView.bind(this);
    this.setScrollPos = this.setScrollPos.bind(this);
    this.setOrientation = this.setOrientation.bind(this);

    this.state = {
      logged_in: false,
      activeView: null,
      scrollPos: 100,
      isPortrait: false
    };
  }

  componentDidMount() {
    this.setActiveView();

    this.setOrientation();
    window.addEventListener('resize', this.setOrientation);
  }

  // clean up ears
  componentWillUnmount() {
    window.removeEventListener('resize', this.setOrientation);
  }

  // set/update current view
  setActiveView() {
    const name = FUNCS.getCurrentView();

    this.setState({
      activeView: name
    }, () => console.log('Active view:', name));
  }

  // get scrollPos
  setScrollPos(val) {
    this.setState({
      scrollPos: val
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

  render() {
    return (
      <App_styled className="App">
        <IntroVideo
          src='https://s3.amazonaws.com/codecademy-content/courses/React/react_video-fast.mp4'
          isPortrait={this.state.isPortrait}
        />

        <Router>
          <Navigation
            activeView={this.state.activeView}
            setActiveView={this.setActiveView}
          />

          <Route
            path={ROUTES.HOME}
            render={props =>
              <View
                {...props}
                prevView='contact'
                view={HomeView}
                nextView='story'
                scrollPos={this.state.scrollPos}
                setScrollPos={this.setScrollPos}
              />
            }
          />

          <Route
            path={ROUTES.STORY}
            render={props =>
              <View
                {...props}
                prevView='home'
                view={StoryView}
                nextView='news'
                scrollPos={this.state.scrollPos}
                setScrollPos={this.setScrollPos}
              />
            }
          />

          <Route
            path={ROUTES.NEWS}
            render={props =>
              <View
                {...props}
                prevView='story'
                view={NewsView}
                nextView='contact'
                scrollPos={this.state.scrollPos}
                setScrollPos={this.setScrollPos}
              />
            }
          />

          <Route
            path={ROUTES.CONTACT}
            render={props =>
              <View
                {...props}
                prevView='news'
                view={ContactView}
                nextView='home'
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



