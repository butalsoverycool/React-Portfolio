// temp*
import axios from 'axios';

// temp* test POST-func with Axios
export const axiosPost = async input =>
    axios.post(
        '/backend',
        input)
        .then(res => res.data)
        .catch(err => err);

//axiosPost(testInput);

// FUNC-GLOBALS
let lastScrollTop = 0;

export const addClass = (classList, nameToAdd) => {
    let updated = classList.push(nameToAdd);
}

export const reachedTop = () => {
    const res = document.querySelector('.ContentContainer').getBoundingClientRect().top; // <= window.innerHeight;

    return res >= 0;
}

export const reachedBottom = elem => {
    const pos = elem.scrollTop;
    const docHeight = elem.scrollHeight;
    console.log('bottom', pos, 'height', docHeight);
    return pos > docHeight - 700;
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



