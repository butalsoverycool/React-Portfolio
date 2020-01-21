import React from 'react';

// FUNC-GLOBALS
let lastScrollTop = 0;

export const addClass = (classList, nameToAdd) => {
    let updated = classList.push(nameToAdd);
}

export const reachedTop = () => {
    const res = document.querySelector('.ContentContainer').getBoundingClientRect().top; // <= window.innerHeight;

    return res >= 0;
}

export const reachedBottom = () => {
    const res = document.querySelector('.ContentContainer').getBoundingClientRect().bottom;
    const docHeight = document.querySelector('.ContentContainer').clientHeight;
    console.log(res, 'doc-height', docHeight);
    return res < 500 && docHeight > 500;
}

export const scrollingDown = (elem) => {
    // scroll direction
    let current = window.pageYOffset;
    let down = false;
    if (current > lastScrollTop) {
        down = true;
    }
    lastScrollTop = current <= 0 ? 0 : current; // For Mobile or negative scrolling
    return down;
}


export const scrollHandler = () => {
    // if at bottom...
    if (reachedBottom(this.elem.current)) {
        // remove listener and go to next view
        document.removeEventListener('scroll', this.scrollHandler);
        this.props.nextNavLink.click();
    }

    else if (reachedTop(this.elem.current)) {
        document.removeEventListener('scroll', this.scrollHandler);
        this.props.prevNavLink.click();
    }
}

export const getCurrentView = () =>
    window.location.pathname.substring(1) !== ''
        ? window.location.pathname.substring(1)
        : 'home';


export const getLinkElem = (view) => document.querySelector(`.NavLink.${view}`);


