import Tokens from 'csrf';

const tokens = new Tokens();

export function createToken() {
  return tokens.create(process.env.CSRF_SECRET_SALT as string);
}

export function verifyCsrfToken(token: string) {
  return tokens.verify(process.env.CSRF_SECRET_SALT as string, token);
}
