import nextConnect from 'next-connect';
import { NextApiRequest, NextApiResponse } from 'next';
import { verify } from 'jsonwebtoken';
import { secret } from '../api/secret';

// for middleware
export interface NextApiRequestExtended extends NextApiRequest {
  userId: number | null;
  username: string | null;
}

// using next-connect for API routes BOILERPLATE
export default nextConnect<NextApiRequestExtended, NextApiResponse>({
  // custom error handler
  onError(error, req, res) {
    res
      .status(501)
      .json({ error: `Oops, sorry there is an error: ${error.message}` });
  },
  onNoMatch(req, res) {
    res.status(405).json({ error: `Method ${req.method} not allowed` });
  },
}).use((req, res, next) => {
  // using middlewares
  // lets say the auth token from JWT, contains userId, username PAYLOAD
  const { authorization } = req.headers;

  if (!authorization) {
    next();
  } else {
    verify(authorization, secret, (error: any, decoded: any) => {
      if (!error && decoded) {
        req.userId = decoded.userId;
        req.username = decoded.username;
      }

      next();
    });
  }
});
