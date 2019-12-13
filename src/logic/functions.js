// FUNC-GLOBALS
let lastScrollTop = 0;

export const addClass = (classList, nameToAdd) => {
    let updated = classList.push(nameToAdd);
}

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
