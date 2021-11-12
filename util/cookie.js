import { serialize } from 'cookie';
import Cookies from 'js-cookie';

export function getParsedCookie(key) {
  try {
    return JSON.parse(Cookies.get(key));
  } catch (err) {
    return undefined;
  }
}

export function setParsedCookie(key, value) {
  Cookies.set(key, JSON.stringify(value));
}

export function createSerializedSignUpSessionsTokenCookie(token) {
  // check if we are in production on Heroku etc.
  const isProduction = process.env.NODE_ENV === 'production';
  // set to 10 minutes
  const maxAge = 60 * 10;

  return serialize('sessionTokenSignUp', token, {
    maxAge: maxAge,
    expires: new Date(Date.now() + maxAge * 1000),
    httpOnly: true,
    secure: isProduction,
    path: '/',
    sameSite: 'lax',
  });
}
