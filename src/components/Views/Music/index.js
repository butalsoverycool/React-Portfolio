import React, { useContext } from "react";
import { StateContext } from "../../StateContext";

// shared
import Follow from "../../Follow";
import UserMsg from "../../UserMsg";

// funcs

// style
import styled from "styled-components";
import ViewTemplate from "../ViewTemplate";
import "./index.scss";

const Container = styled.div`
  width: 100%;
  margin: auto;
  text-align: center;
`;

const Iframe = styled.iframe`
  margin: auto;
  margin: ${props => props.margin || "0"};
  width: 100%;
  border: none;
  box-shadow: 0 0 10px #eee;
`;

const MusicView = props => {
  const { state } = useContext(StateContext);

  /*  // always display loadingMsg before iframe load
  React.useEffect(() => {
    if (!nav.display) {
      // insulting DOM
      document.querySelector(".loading").style.display = "block";
    }
  }, [nav.display]);

  const iframeLoaded = () => {
    // insulting DOM
    document.querySelector(".loading").style.display = "none";
  }; */

  return (
    <>
      <ViewTemplate>
        {/* <UserMsg
          msg="Loading..."
          msgClass="loading"
          containerClass="LoadingContainer"
          anim={true}
        /> */}

        <Container>
          <Iframe
            src="https://open.spotify.com/embed/artist/2OvDFvv8UQlLBQyzjGRhwo"
            width="300"
            height="200"
            frameborder="0"
            allowtransparency="true"
            allow="encrypted-media"
          ></Iframe>

          <Iframe
            src="https://open.spotify.com/follow/1/?uri=spotify:artist:2OvDFvv8UQlLBQyzjGRhwo&size=detail&theme=light"
            width="300"
            height="56"
            scrolling="no"
            frameborder="0"
            allowtransparency="true"
            margin="20px auto"
          ></Iframe>

          <Iframe
            width="560"
            height="315"
            src="https://www.youtube.com/embed/videoseries?list=PLVqoNI4QDlCo7uJIY4aU80d2TJR99sYlF"
            frameborder="0"
            allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
            allowfullscreen
          ></Iframe>

          <Iframe
            width="560"
            height="315"
            src="https://www.youtube.com/embed/6VgSPu67wAw"
            frameborder="0"
            allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
            allowfullscreen
          ></Iframe>

          <Iframe
            width="560"
            height="315"
            src="https://www.youtube.com/embed/2Z0X0o5ojjU"
            frameborder="0"
            allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
            allowfullscreen
          ></Iframe>

          <Iframe
            width="560"
            height="315"
            src="https://www.youtube.com/embed/lD2Z1lT4XgI"
            frameborder="0"
            allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
            allowfullscreen
          ></Iframe>
        </Container>
      </ViewTemplate>
    </>
  );
};

export default MusicView;
