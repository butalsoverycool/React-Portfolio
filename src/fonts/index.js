/* import regular from env.PUBLIC_URL + '/fonts/JosefinSans-Regular.ttf'; */

import { createGlobalStyle } from 'styled-components';


import fontThin from './JosefinSans-Thin.ttf';
import fontLight from './JosefinSans-Light.ttf';
import fontRegular from './JosefinSans-Regular.ttf';
import fontSemiBold from './JosefinSans-SemiBold.ttf';
import fontBold from './JosefinSans-Bold.ttf';

const GlobalFont = createGlobalStyle`
  @font-face {
    font-family: 'JosefinSans-Thin';
    src: url('${fontThin}') format('opentype');
    font-display: fallback; /* <- this can be added to each @font-face definition */
  }
  @font-face {
    font-family: 'JosefinSans-Light';
    src: url('${fontLight}') format('opentype');
    font-display: fallback; /* <- this can be added to each @font-face definition */
  }
  @font-face {
    font-family: 'JosefinSans-Regular';
    src: url('${fontRegular}') format('opentype');
    font-display: fallback; /* <- this can be added to each @font-face definition */
  }
  @font-face {
    font-family: 'JosefinSans-SemiBold';
    src: url('${fontSemiBold}') format('opentype');
    font-display: fallback; /* <- this can be added to each @font-face definition */
  }
  @font-face {
    font-family: 'JosefinSans-Bold';
    src: url('${fontBold}') format('opentype');
    font-display: fallback; /* <- this can be added to each @font-face definition */
  }
`;

export default GlobalFont;