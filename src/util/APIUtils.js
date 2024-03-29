import { API_BASE_URL, ACCESS_TOKEN } from '../constants';

const request = (options) => {
    const headers = new Headers({
        'Content-Type': 'application/json',
    })
    
    if(localStorage.getItem(ACCESS_TOKEN) && localStorage.getItem(ACCESS_TOKEN) !== 'undefined') {
        headers.append('Authorization', 'Bearer ' + localStorage.getItem(ACCESS_TOKEN))
    }

    const defaults = {headers: headers};
    options = Object.assign({}, defaults, options);    

    return fetch(options.url, options)
    .then(response => 
        response.json().then(json => {
            if(!response.ok) {
                return Promise.reject(json);
            }
            return json;
        })
    );
};

export function login(loginRequest) {
    return request({
        url: API_BASE_URL + "auth/login",
        method: 'POST',
        body: JSON.stringify(loginRequest)
    });
}

export function signup(signupRequest) {
    localStorage.removeItem(ACCESS_TOKEN);
    return request({
        url: API_BASE_URL + "register",
        method: 'POST',
        body: JSON.stringify(signupRequest)
    });
}

export function getCurrentUser() {
    if(!localStorage.getItem(ACCESS_TOKEN)) {
        return Promise.reject("No access token set.");
    }

    return request({
        url: API_BASE_URL + "users/me",
        method: 'GET'
    });
}

export function getUserProfile(email) {
    return request({
        url: API_BASE_URL + "users/" + email,
        method: 'GET'
    });
}