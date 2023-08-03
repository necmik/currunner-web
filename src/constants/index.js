export const API_BASE_URL = process.env.REACT_APP_API_BASE_URL || 'http://localhost:8080/';
export const ACCESS_TOKEN = 'accessToken';

export const NAME_MIN_LENGTH = 3;
export const NAME_MAX_LENGTH = 40;

export const PASSWORD_MIN_LENGTH = 6;
export const PASSWORD_MAX_LENGTH = 20;

export const OAUTH2_REDIRECT_URI = 'http://localhost:3000/oauth2/redirect'
export const GOOGLE_AUTH_URL = API_BASE_URL + '/oauth2/authorize/google?redirect_uri=' + OAUTH2_REDIRECT_URI;
export const FACEBOOK_AUTH_URL = API_BASE_URL + '/oauth2/authorize/facebook?redirect_uri=' + OAUTH2_REDIRECT_URI;
export const GITHUB_AUTH_URL = API_BASE_URL + '/oauth2/authorize/github?redirect_uri=' + OAUTH2_REDIRECT_URI;