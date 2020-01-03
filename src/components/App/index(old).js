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
    const destination = activeSection < sectionNum ? activeSection + 1 : 1;
    setActiveSection(destination);
  }

  React.useEffect(() => {
    console.log('active section in state:', activeSection)
    jumpToSection(activeSection);
  }, [activeSection]);

  // on resize, update reset jump/distance
  window.onresize = () => {
    jumpToSection(activeSection);
  }

  // prevent regular scroll (for now...)
  window.onscroll = (e) => {
    e.preventDefault(); // ????
    //window.scrollTo(0, 0);
  }



  // JUMP TO SECTION
  const jumpToSection = (destination) => {
    const startingPoint = destination - 1; // zero is first
    const mirrored = startingPoint - startingPoint * 2; // flip minus <--> plus
    const distance = mirrored * window.innerHeight; // each section has full height

    // translate y with 3d
    document.body.style.transform = 'translate3d(0px, ' + distance + 'px, 0px)';
    console.log('3D-translated Y to:', distance + 'px');
  }

  const [navFocus, setNavFocus] = React.useState([]);

  const navFocusHandler = (key, val) => {
    setNavFocus({ key, val });
  }

  React.useEffect(() => {
    if (!navFocus.length) return;
    navFocus.style[navFocus.key] = navFocus.val;
  }, [navFocus]);



  // THEME
  const [theme, setTheme] = React.useState(themeOrange);

  const updateTheme = (newTheme = themePurple) => {
    setTheme(newTheme);
  }

  React.useEffect(() => {
    console.log('Updated theme to:', theme.name)
  }, [theme]);



  const open = (e) => {
    let elem = e.target.closest('div.sectCont');
    elem.classList.remove('close');
  }

  const close = (e) => {
    let elem = e.target.closest('div.sectCont');
    elem.classList.add('close');
  }

  const onHover = (elem, key = 'height', val = '400px') => {
    //const context = React.useContext(Context);
    elem.style = val;

    console.log('eeeel', elem)
    /* return (
      context.navFocusHandler(elem)
    ); */
  }

  return (
    <Context.Provider
      value={{
        theme,
        updateTheme,
        prevSection,
        nextSection,
        open,
        close
      }}>
      <App_styled className="App">
        <Wrapper_styled>
          <Row>
            <Block className='Block'>
              <NavBtn
                className='NavBtn work top'
                top='0'
              >
                <p className='NavTxt work'>Work</p>
              </NavBtn>
            </Block>
          </Row>
          <Row grow={2}>
            <Block>
              <NavBtn
                className='NavBtn news left'
              >
                <p className='NavTxt news'>News</p>
              </NavBtn>
            </Block>
            <Block grow={4}></Block>
            <Block>
              <NavBtn
                className='NavBtn contact right'
              >
                <p className='NavTxt contact'>Contact</p>
              </NavBtn>
            </Block>
          </Row>
          <Row>
            <Block className='Block'>
              <NavBtn
                className='NavBtn story bottom'
                bottom='0'
              >
                <p className='NavTxt story'>Story</p>
              </NavBtn>
            </Block>
          </Row>
        </Wrapper_styled>
      </App_styled>
    </Context.Provider>
  );
}

export default App;


const NavBtn_styled = styled.button`
  position: absolute;
  width: 100%;
  left:0;
  top:${props => props.top || 'unset'};
  bottom:${props => props.bottom || 'unset'};
  border: none;
  outline: none;
  font-size: 1em;
`;

const NavBtn = (props) => {
  return (
    <NavBtn_styled
      top={props.top}
      bottom={props.bottom}
      className={props.className}>
      {props.children || 'empty NavBtn'}
    </NavBtn_styled>
  );
}

const Block_styled = styled.div`
  flex-grow: ${ props => props.grow || 1};
  position: relative;

  display: flex;
  flex-direction: column;
  justify-content: center;
  background: ${ props => props.bg};
`;



class Block extends Component {
  constructor(props) {
    super(props);
    this.elem = React.createRef();


  }

  componentDidMount() {

  }

  focusStyle() {
    return [
      { key: 'font-size', val: '3em' }
    ];
  }

  focusOutStyle() {
    return [
      { key: 'font-size', val: '1em' }
    ];
  }


  render() {
    return (
      <Block_styled
        ref={this.elem}
        grow={this.props.grow}
        bg={this.props.bg}
        className={this.props.className}
      >
        {this.props.children || <p>empty block</p>}
      </Block_styled>
    );
  }
}

const Row_styled = styled.div`
width: 100vw;
display: flex;
flex-direction: row;
flex-grow: ${ props => props.grow || 1};


`;



const Row = (props) => {
  return (
    <Row_styled grow={props.grow}>
      {props.children}
    </Row_styled>
  );
}

const Wrapper_styled = styled.div`
width: 100vw;
height: 100vh;
display: flex;
flex-direction: column;
`;

const Wrapper = (props) => {

  return (
    <Wrapper_styled className='Wrapper'>
      {props.children}
    </Wrapper_styled>
  );
}


{/* <div className='sectCont sect1'>
          <Section>
            <Button action='prevSection'>Prev</Button>
            <Button action='nextSection'>Next</Button>
            <Button action='open'>Open</Button>
            <Button action='close'>Close</Button>
          </Section>
        </div>
        <div className='sectCont sect2'>
          <Section theme={themePurple} >
            <Button action='prevSection' theme={themePurple}>Prev</Button>
            <Button action='nextSection' theme={themePurple}>Next</Button>
            <Button action='open'>Open</Button>
            <Button action='close'>Close</Button>
          </Section>
        </div>
        <div className='sectCont sect3'>
          <Section theme={themeBlack} >
            <Button action='prevSection' theme={themeBlack}>Prev</Button>
            <Button action='nextSection' theme={themeBlack}>Next</Button>
            <Button action='open'>Open</Button>
            <Button action='close'>Close</Button>
          </Section>
        </div> */}