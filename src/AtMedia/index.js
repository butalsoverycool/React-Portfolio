import { css } from 'styled-components';

// media queries helper for styled components
const atMedia = args => {

    // join args to media string
    const query = (args.map(
        condition => `(${condition.key}: ${condition.val})`
    )).join(' and ');

    // (style = stuff in the css`` following the call)
    return (...style) => css`
        @media ${query} {
            ${css(...style)};
        }
    `;
}

export default atMedia;