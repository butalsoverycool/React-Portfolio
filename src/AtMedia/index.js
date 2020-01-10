import styled, { css } from 'styled-components';

const customBreakPoint = (valAndUnit) => valAndUnit || '300px';

const breakPoints = {
    narrow: '420px',
    veryNarrow: '350px',
    short: '700px',
    veryShort: '650px',
    portrait: 'portrait',
    landscape: 'landscape',
    navH: '950px',
    navW: '680px',
    narrowSongCard: '320px'
}



// media queries helper for styled components
const responsive = (condition) => {
    // return obj
    // with each prop accessible as media query 
    // in css-format for a styled-component
    return Object.keys(breakPoints).reduce((acc, label) => {
        acc[label] = (...args) => css`
      @media (${condition}: ${breakPoints[label]}) {
         ${css(...args)};
      }
   `
        return acc;
    }, {});
}

export default responsive;