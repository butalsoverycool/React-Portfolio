import React from 'react';

// FUNC-GLOBALS
let lastScrollTop = 0;

export const addClass = (classList, nameToAdd) => {
    let updated = classList.push(nameToAdd);
}

export const reachedTop = elem => document.documentElement.scrollTop <= 0;// <= window.innerHeight;

export const reachedBottom = elem => elem.getBoundingClientRect().bottom <= window.innerHeight;

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
