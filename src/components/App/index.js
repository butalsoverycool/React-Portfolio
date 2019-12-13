// react
import React, { Component } from 'react';
import ReactDOMServer from 'react-dom/server';

// router
import { BrowserRouter as Router, Route } from 'react-router-dom';

// url/route-list
import * as ROUTES from '../../constants/routes';

// views
import HomeView from '../Views/Home/index';
import StoryView from '../Views/Story/index';
import NewsView from '../Views/News/index';
import ContactView from '../Views/Contact/index';

// children
import Navigation from '../Shared/Navigation';

// style
import './index.scss';
import './animation.scss';


export default class App extends Component {
  constructor(props) {
    super(props);

    this.setActiveView = this.setActiveView.bind(this);

    this.state = {
      logged_in: false,
      activeView: null,
      isMounted: false
    };
    console.log('app-state:', this.state);

  }

  toggle = () => {
    this.setState(state => ({ isMounted: !state.isMounted }))
  }

  componentDidMount() {

  }

  setActiveView(name) {
    if (!name) { return; }

    this.setState({
      activeView: name
    }, () => console.log('Active view:', name));
  }



  render() {
    return (
      <div className="App">
        <Router>
          <Navigation activeView={this.setActiveView} />

          <Route
            path={ROUTES.HOME}
            render={props => <HomeView {...props} nextView={document.querySelector('.NavLink.story')} />}
          />
          <Route
            path={ROUTES.STORY}
            render={props => <StoryView {...props} nextView={document.querySelector('.NavLink.news')} />}
          />
          <Route
            path={ROUTES.NEWS}
            render={props => <NewsView {...props} nextView={document.querySelector('.NavLink.contact')} />}
          />
          <Route
            path={ROUTES.CONTACT}
            render={props => <ContactView {...props} nextView={document.querySelector('.NavLink.home')} />}
          />
        </Router>
      </div>
    );
  }
}



