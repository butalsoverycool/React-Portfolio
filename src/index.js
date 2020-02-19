import React, { createRef } from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./components/App/index";
import * as serviceWorker from "./serviceWorker";

import { StateProvider } from "./components/StateContext/index";

const AppRef = createRef();

ReactDOM.render(
  <StateProvider>
    <App ref={AppRef} />
  </StateProvider>,
  document.getElementById("root")
);

serviceWorker.register();
//https://bit.ly/CRA-PWA
