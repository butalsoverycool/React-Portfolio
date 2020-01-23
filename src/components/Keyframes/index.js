import { keyframes } from 'styled-components';

export const navFadeIn = keyframes`
  0% {
    opacity: 0;
    transform: translate3d(0px, 50px, 0px) scale(1.5);
  }100% {
    opacity: 1;
    transform: translate3d(0px, 0px, 0px) scale(1);
  }
`;

export const navFadeOut = view => {
  let power = '';

  if (view === 'work' || view === 'contact') {
    power = '-'
  }

  let xyz = [
    0,
    0,
    0
  ];

  if (view === 'music' || view === 'contact') {
    xyz[0] = power + 200;
  } else {
    xyz[1] = power + 200;
  }

  let values = String(xyz.map(val => val + 'px'));

  return keyframes`
        0%{
            opacity: 1;
            transform: translate3d(0px, 0px, 0px);
        }100% {
            z-index: -1;
            opacity: 0;
            transform: translate3d(${values});
        }
    `;
}

export const navRise = keyframes`
    0% {
        z-index: 1;
        opacity: 1;
        transform: translate3d(0px, 100%, 0px);
    }100% {
        z-index: 1;
        opacity: 1;
        transform: translate3d(0px, -50px, 0px);
    }
`;

export const navFall = keyframes`
  0% {
    z-index: 1;
    opacity: 1;
    transform: translate3d(0px, -50px, 0px);
  }100% {
    z-index: 1;
    opacity: 1;
    transform: translate3d(0px, 100%, 0px);
  }
`;



const riseNarrow = (() => {
  let narrow = window.innerWidth <= 680;

  return narrow
    ? keyframes`
            0% {
                z-index: 1;
                opacity: 1;
                transform: translate3d(0px, 100%, 0px);
            }100% {
                z-index: 1;
                opacity: 1;
                transform: translate3d(0px, -200px, 0px);
            }
        `
    : keyframes`
            0% {
                z-index: 1;
                opacity: 1;
                transform: translate3d(0px, 100%, 0px);
            }100% {
                z-index: 1;
                opacity: 1;
                transform: translate3d(0px, 200px, 0px);
            }
        `;
})();
