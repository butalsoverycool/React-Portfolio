import { useContext } from "react";
import { StateContext } from "../StateContext";

//smoothscroll polyfill
import smoothscroll from "smoothscroll-polyfill";

const Location = props => {
  const { state, dispatch } = useContext(StateContext);

  const { history } = props;

  const { appRef, historyStack, activeView, intro } = state;

  let lastPrev =
    historyStack.prev.length > 0
      ? historyStack.prev[historyStack.prev.length - 1].path
      : undefined;

  let current = history.location.pathname;

  if (lastPrev === undefined || lastPrev !== current) {
    //if pop and different and lastPrev !== undefined arr.pop() historyStack
    if (
      history.action === "POP" &&
      lastPrev !== current &&
      lastPrev !== undefined &&
      historyStack.prev.length > 0
    ) {
      dispatch({ type: "historyPop" });

      // else add to history
    } else {
      dispatch({
        type: "historyPush",
        payload: {
          path: current,
          action: history.action
        }
      });

      if (appRef.ref) {
        smoothscroll.polyfill();
        if (appRef.ref.scrollTop !== appRef.setScrollY) {
          appRef.ref.scrollBy({
            top: 0,
            behavior: "smooth"
          }); // hm not working...
          appRef.ref.scrollTop = 0;
        }
      }
    }
  }

  // reset intro-status
  if ((intro.play || intro.ended) && activeView !== "") {
    dispatch({
      type: "intro",
      payload: { play: false, ended: false }
    });
  }

  // app scroll up?

  return "";
};

export default Location;
