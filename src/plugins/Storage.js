import jwtDecode from 'jwt-decode';

const Storage = {
    get: (key) => {
        if (window.localStorage) {
            return window.localStorage.getItem(`${process.env.REACT_APP_APPNAME}_${key}`);
        }
        return null;
    },
    set: (key, val) => {
        if (window.localStorage) {
            window.localStorage.setItem(`${process.env.REACT_APP_APPNAME}_${key}`, val);
        }
    },
    decode: (token) => jwtDecode(token),
    reset: () => {
        window.localStorage.clear();
    }
};

export default Storage;

