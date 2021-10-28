// this is going to be my API route, the page is going to communicate with!
// in the API Route I am getting the username and password (not yet a hashed password)
// somewhere in this code happens some magic to convert a password to a hashed password!
import { NextApiRequest, NextApiResponse } from 'next';

export default async function signUpHandler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  console.log('req.body', req.body);
  res.send(null);
}

/*  res.send is similar to return - I am sending a response back to the browser */
