// react
import React, { Component } from 'react';
import ReactDOMServer from 'react-dom/server';

// router
import { BrowserRouter as Router, Route } from 'react-router-dom';

// url/route-list
import * as ROUTES from '../../constants/routes';

// views


// children
import Navigation from '../Shared/Navigation';
import View from '../Views/index';
import HomeView from '../Views/Home/index';
import StoryView from '../Views/Story/index';
import NewsView from '../Views/News/index';
import ContactView from '../Views/Contact/index';

// style
import styled, { Keyframes } from 'styled-components';

const App_styled = styled.div`
  width: 100vw;
  height: 100vh;
  min-height: 110vh;
`;


class IntroVideo extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      orientation: 'portrait'
    };

    this.setOrientation = this.setOrientation.bind(this);
    this.getStyle = this.getStyle.bind(this);
    this.Video_styled = this.getStyle(this.state.orientation);
  }

  componentDidMount() {
    this.setOrientation();
    window.addEventListener('resize', this.setOrientation);
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.setOrientation)
  }

  setOrientation() {
    if (window.innerHeight < window.innerWidth * .57) {
      if (this.state.orientation === 'landscape') { return; }
      this.setState({
        orientation: 'landscape'
      }, () => {
        this.Video_styled = this.getStyle(this.state.orientation);
      });

    } else {
      if (this.state.orientation === 'portrait') { return; }
      this.setState({
        orientation: 'portrait'
      }, () => {
        this.Video_styled = this.getStyle(this.state.orientation);
      });
    }
  }

  getStyle(orientation) {
    return styled.video`
      width: ${orientation === 'landscape' ? 'auto' : '100vw'};
      height: ${orientation === 'landscape' ? '100vh' : 'auto'};
      float: left;
      top: 0;
      padding: none;
      position: fixed;
      z - index: 5;
      `;
  }

  render() {
    return (
      <div>
        <this.Video_styled
          orientation={this.state.orientation}
          className="video-container video-container-overlay"
          autoPlay={true}
          loop muted={this.props.muted || true}>
          <source src={this.props.src} type="video/mp4" />
        </this.Video_styled>
      </div>
    );
  }
}

export default class App extends Component {
  constructor(props) {
    super(props);

    this.setActiveView = this.setActiveView.bind(this);
    this.setScrollPos = this.setScrollPos.bind(this);

    this.state = {
      logged_in: false,
      activeView: null,
      scrollPos: 100
    };

    console.log('app-state:', this.state);

  }

  checkStartView() {
    let path = window.location.pathname.substr(1);

    if (path !== '') {
      this.setActiveView(path);
    }
  }

  componentDidMount() {
    this.checkStartView();
  }

  setActiveView(name) {
    if (!name) { return; }

    this.setState({
      activeView: name
    }, () => console.log('Active view:', name));
  }

  setScrollPos(val) {
    this.setState({
      scrollPos: val
    });
  }

  render() {
    return (
      <App_styled className="App">
        <IntroVideo src='https://s3.amazonaws.com/codecademy-content/courses/React/react_video-fast.mp4' />

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



