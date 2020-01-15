import { css } from 'styled-components';

const breakPoints = {
    narrow: '420px',
    veryNarrow: '350px',
    short: '700px',
    veryShort: '650px',
    narrowSongCard: '320px'
}

// media queries helper for styled components
const atMedia = (conditions) => {

    // join conditions to media string
    const lastIteration = conditions.length - 1
    const args = (conditions.map(
        (condition, iteration) => {
            // seperate conditions with 'and', unless on last iteration
            let and = iteration < lastIteration
                ? 'and' : '';

            // use breakPoint if matching val
            for (let breakPoint in breakPoints) {
                if (condition.val === breakPoint) {
                    condition.val = breakPoints[breakPoint];
                }
            }

            // each arg as
            return `(${condition.key}: ${condition.val}) ${and} `
        }
    )).join('');

    // return media query with conditions and vals
    // (style = stuff in css``)
    return (...style) => css`
        @media ${args} {
            ${css(...style)};
        }
    `;
}

export default atMedia;