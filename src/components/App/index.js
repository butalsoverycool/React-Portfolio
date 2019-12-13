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

// shared
import Navigation from '../Shared/Navigation';

// style
import './index.scss';

export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      logged_in: false
    };
    console.log('app-state:', this.state);
  }

  componentDidMount() {

  }

  render() {
    return (
      <div className="App">
        <Router>
          <div>
            <Navigation />
          </div>

          {/* Route-linking */}
          <Route path={ROUTES.HOME} component={HomeView} />
          <Route path={ROUTES.STORY} component={StoryView} />
          <Route path={ROUTES.NEWS} component={NewsView} />

          {/* or if I wanna send props...I do render instead of component-prop */}
          <Route path={ROUTES.CONTACT}
            render={
              (props) => <ContactView {...props} />
            }
          />
        </Router>
      </div>
    );
  }
}
