import React from "react";

export const initialState = {
  stateWasReset: false,
  freshState: true,
  appRef: {
    ref: undefined,
    setScrollY: 0
  },
  user: {
    mobile: undefined
  },
  winSize: { w: window.innerWidth, h: window.innerHeight },
  historyStack: {
    prev: [],
    next: [],
    history: undefined
  },
  activeView: window.location.pathname.substring(1),
  intro: { play: false, ended: false },
  titleIntro: { play: false, ended: false },
  nav: {
    display: false,
    animation:
      window.location.pathname === "/"
        ? { in: "navFadeIn", out: "navFadeOut" }
        : { in: "navRise", out: "navFall" }
  },
  scrolling: {
    bottom: false,
    scrollUp: false
  }
};

// State updater
const stateReducer = (state, action) => {
  // default = prev state
  let newState = {};
  for (let prop in state) {
    newState[prop] = state[prop];
  }

  if (newState.freshState) {
    newState.freshState = false;
  }

  let reducerMsg = "";

  // update state according to given action type/payload
  switch (action.type) {
    // wip/phase out
    case "resetState":
      for (let prop in initialState) {
        if (prop != "historyStack") {
          newState[prop] = initialState[prop];
        }
      }

      //console.log(`Resetting state...(except history)`);

      return newState;

    case "stateWasReset":
      // wip/phase out
      newState.stateWasReset = action.payload;

      //console.log(`Updated state (${action.type}): ${newState[action.payload]}`);

      return newState;

    case "freshState":
      // wip/phase out
      newState.freshState = action.payload;

      //console.log(`Updated state (${action.type}): ${newState.freshState}`);

      return newState;

    case "appRef":
      reducerMsg = `Updated state (${action.type}): `;

      for (let prop in action.payload) {
        newState.appRef[prop] = action.payload[prop];
        reducerMsg += `${prop} = ${action.payload[prop]}, `;
      }

      //console.log(reducerMsg);

      return newState;

    case "user":
      reducerMsg = `Updated state (${action.type}): `;

      for (let prop in action.payload) {
        newState.user[prop] = action.payload[prop];
        reducerMsg += `${prop} = ${action.payload[prop]}, `;
      }

      //console.log(reducerMsg);

      return newState;

    case "winSize":
      newState.winSize = action.payload;

      //console.log(`Updated state (${action.type}): ${newState.winSize.w} x ${newState.winSize.h}`);

      return newState;

    case "historyPush":
      newState.historyStack.prev.push(action.payload);

      //console.log(`Updated state (${action.type}): path = ${action.payload.path}, action = ${action.payload.action}, scrollTop = ${action.payload.scrollTop}`);

      return newState;

    case "historyPop":
      newState.historyStack.prev.pop();

      //console.log(`Updated state (${action.type}): HISTORY: ${newState.historyStack.prev}`);

      return newState;

    case "routeHistory":
      newState.historyStack.history = action.payload;

      //console.log(`Updated state (${action.type}): ${action.payload}`);

      return newState;

    case "lastScrollPos":
      newState.historyStack.lastScrollPos = action.payload;

      //console.log(`Updated state (${action.type}): ${action.payload}`);

      return newState;

    case "activeView":
      newState.activeView = action.payload;

      //console.log(`Updated state (${action.type}): ${action.payload}`);

      return newState;

    case "intro":
      reducerMsg = `Updated state (${action.type}): `;

      for (let status in action.payload) {
        newState.intro[status] = action.payload[status];
        reducerMsg += `${status} = ${action.payload[status]}, `;
      }

      //console.log(reducerMsg);

      return newState;

    case "titleIntro":
      reducerMsg = `Updated state (${action.type}): `;

      for (let status in action.payload) {
        newState.titleIntro[status] = action.payload[status];
        reducerMsg += `${status} = ${action.payload[status]}, `;
      }

      //console.log(reducerMsg);

      return newState;

    case "nav":
      reducerMsg = `Updated state (${action.type}): `;

      for (let prop in action.payload) {
        newState.nav[prop] = action.payload[prop];
        reducerMsg += `${prop} = ${action.payload[prop]}, `;
      }

      //console.log(reducerMsg);

      return newState;

    case "scrolling":
      reducerMsg = `Updated state (${action.type}): `;

      for (let prop in action.payload) {
        newState.scrolling[prop] = action.payload[prop];
        reducerMsg += `${prop} = ${action.payload[prop]}, `;
      }

      //console.log(reducerMsg);

      return newState;

    default:
      //console.log("Action type undefined. Keeping prev state.");

      return state;
  }
};

const StateContext = React.createContext(initialState);

const StateProvider = props => {
  const [state, dispatch] = React.useReducer(stateReducer, initialState);

  return (
    // sending the state and its updater-func with the provider-component wrapping App
    <StateContext.Provider value={{ state, dispatch }}>
      {props.children}
    </StateContext.Provider>
  );
};

export { StateContext, StateProvider };
