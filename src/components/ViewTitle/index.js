import React, { forwardRef, useContext } from "react";
import styled from "styled-components";
import { StateContext } from "../StateContext";
import { CSSTransition } from "react-transition-group";
import "./index.scss";

// endframes
import musicEndframe from "../../media/musicEndframe.png";
import storyEndframe from "../../media/storyEndframe.png";
import workEndframe from "../../media/workEndframe.png";
import contactEndframe from "../../media/contactEndframe.png";

//intros
import musicIntro from "../../media/musicIntro.mp4";
import storyIntro from "../../media/storyIntro.mp4";
import workIntro from "../../media/workIntro.mp4";
import contactIntro from "../../media/contactIntro.mp4";

const TitleContainer = styled.div`
  width: 180px;
  height: 100px;
  position: relative;
  margin: 70px 0;
`;

const TitleIntro = styled.video`
  width: 100%;
  opacity: 0;
  transition: 3s;
`;

const ViewTitle = forwardRef((props, ref) => {
  const { state, dispatch } = useContext(StateContext);

  const { activeView, titleIntro } = state;

  const src = (() => {
    switch (activeView) {
      case "music":
        return {
          intro: musicIntro,
          endframe: musicEndframe
        };
      case "story":
        return {
          intro: storyIntro,
          endframe: storyEndframe
        };
      case "work":
        return {
          intro: workIntro,
          endframe: workEndframe
        };
      case "contact":
        return {
          intro: contactIntro,
          endframe: contactEndframe
        };
      default:
      //...
    }
  })();

  const playHandler = () => {
    if (!titleIntro.play) {
      dispatch({
        type: "titleIntro",
        payload: {
          play: true,
          ended: false
        }
      });
    }
  };

  const endHandler = () => {
    if (titleIntro.play && !titleIntro.ended) {
      dispatch({
        type: "titleIntro",
        payload: {
          play: false,
          ended: true
        }
      });
    }
  };

  return (
    <TitleContainer>
      <CSSTransition in={titleIntro.play && !titleIntro.ended} timeout={400}>
        <TitleIntro
          ref={ref}
          src={src.intro}
          type="video/mp4"
          muted={true}
          autoPlay
          loop={false}
          playsInline={true}
          className={`${activeView}Intro TitleIntro`}
          onPlay={playHandler}
          onEnded={endHandler}
        />
      </CSSTransition>
    </TitleContainer>
  );
});

export default ViewTitle;
