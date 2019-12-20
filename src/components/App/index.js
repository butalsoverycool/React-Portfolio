// react
import React, { Component, useState, useReducer, createContext, useContext } from 'react';
import ReactDOM from 'react-dom';
import ReactDOMServer from 'react-dom/server';

// global funcs
import * as FUNCS from '../../logic/functions';

// children
import Section from '../Section';
import Title from '../Title';
import Button from '../Button';

// style
import StyleModule from '../../style/index.module.css';
import styled, { ThemeProvider, Keyframes, withTheme } from 'styled-components';

// snapp to elem
//import ReactSnapScroll from 'react-snap-scroll';


// THEMES
import { themeOrange, themePurple, themeBlack } from '../../style/themes';


// CONTEXT
export const Context = createContext(null);

// app-style
const App_styled = styled.div`
  width: 100vw;
  height: 100vh;
  text-align: center;
  transform: translate3d(0px, 0px, 0px);
  transition: all 700ms ease;
`;

const App = () => {
  // SECTION COUNT
  window.onload = () => {
    //console.log('num of sections in dom:', document.querySelectorAll('.Section').length)
    countSections(document.querySelectorAll('.Section').length);
  };

  const [sectionNum, setsectionNum] = React.useState(3);
  const countSections = (num) => {
    setsectionNum(num);
  }

  React.useEffect(() => {
    console.log('Sections on page counted to:', sectionNum);
  }, [sectionNum]);



  // ACTIVE SECTION
  const [activeSection, setActiveSection] = React.useState(1);
  const prevSection = () => {   
    // prev or last
    const destination = activeSection > 1 ? activeSection - 1 : sectionNum;
    setActiveSection(destination);
  }

  const nextSection = () => {
    // next or first
    const destination =  activeSection < sectionNum ? activeSection + 1 : 1;
    setActiveSection(destination);
  }

  React.useEffect(() => {
    console.log('active section in state:' , activeSection)
    jumpToSection(activeSection);
  }, [activeSection]);

  window.onresize = () => {
    jumpToSection(activeSection);
  }



  // JUMP TO SECTION
  const jumpToSection = (destination) => {
    const startingPoint = destination -1; // zero is first
    const mirrored = startingPoint - startingPoint * 2; // flip minus <--> plus
    const distance = mirrored * window.innerHeight; // each section has full height
  
    // translate y with 3d
    document.body.style.transform = 'translate3d(0px, ' + distance + 'px, 0px)';
    console.log('3D-translated Y to:', distance + 'px');
  }
  


  // THEME
  const [theme, setTheme] = React.useState(themeOrange);

  const updateTheme = (newTheme = themePurple) => {
    setTheme(newTheme);
  }

  React.useEffect(() => {
    console.log('Updated theme to:', theme.name)
  }, [theme]);



  return (
    <Context.Provider 
      value={{
        theme, 
        updateTheme, 
        prevSection, 
        nextSection
      }}>
      <App_styled className="App">
        <Section>
          <Button action='prevSection'>Prev</Button>
          <Button action='nextSection'>Next</Button>
        </Section>
        <Section theme={themePurple} >
          <Button action='prevSection' theme={themePurple}>Prev</Button>
          <Button action='nextSection' theme={themePurple}>Next</Button>
        </Section>
        <Section theme={themeBlack} >
          <Button action='prevSection' theme={themeBlack}>Prev</Button>
          <Button action='nextSection' theme={themeBlack}>Next</Button>
        </Section>
      </App_styled>
    </Context.Provider>
  );
}

export default App;