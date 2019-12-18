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
// ...

// style
import styled, { Keyframes } from 'styled-components';


const App_styled = styled.div`
  width: 100vw;
  height: auto;
  min-height: ${props => (props.winH + 400) + 'px'};
  padding: 100px 0;
  text-align: center;
`;

const MainTitle = styled.h1`
  color: #222;
  font-size: 2em;
`;

export default class App extends Component {
  constructor(props) {
    super(props);

    this.elem = React.createRef();
  }

  render() {
    return (
      <App_styled className="App" ref={this.elem} >
        <MainTitle>Kim Nkoubou</MainTitle>
      </App_styled>
    );
  }
}



