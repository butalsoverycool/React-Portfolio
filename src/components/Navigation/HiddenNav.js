import React from "react";
import styled from "styled-components";
import atMedia from "../../AtMedia";

const HiddenNavStyled = styled.div`
  outline: none;
  opacity: 0;
  background: red;
  width: 100vw;
  height: inherit;
  position: absolute;
  z-index: 1;
  left: 0;
  top: 0;
  text-align: center;
`;

const BoardContainer = styled.div`
  outline: none;
  margin: 0 auto;
  padding: 0;

  width: 50vw;
  height: 50vw;

  width: 60vh;
  height: 60vh;

  perspective: 70vh;
  transform: rotateZ(4deg);

  position: relative;
  width: 60vh;
  height: 47vh;
  top: -11vh;
  left: -1px;
  ${atMedia([
    { key: "orientation", val: "portrait" },
    { key: "max-height", val: "950px" },
    { key: "max-width", val: "680px" }
  ])`
        width: 100vw;
        height: 58vw;
        top: -11vw;
        perspective: 70vw;
    `}
`;

const Board = styled.div`
  outline: none;
  z-index: 1;

  margin: 0 auto;
  padding: 0;

  width: 50vw;
  height: 50vw;

  width: 54vh;
  height: 55vh;

  transform: rotate3d(5, 1, -2, 61deg) rotateZ(-23deg) rotateX(1deg)
    rotateY(-5deg);
  ${atMedia([
    { key: "orientation", val: "portrait" },
    { key: "max-height", val: "950px" },
    { key: "max-width", val: "680px" }
  ])`
        width: 54vw;
        height: 55vw;
    `}
`;

const HiddenNav = props => {
  return (
    <HiddenNavStyled className="HiddenNav">
      <BoardContainer className="BoardContainer">
        <Board className="Board">{props.children}</Board>
      </BoardContainer>
    </HiddenNavStyled>
  );
};

export default HiddenNav;
