import { NextApiHandler, NextApiRequest, NextApiResponse } from 'next';
import { verify } from 'jsonwebtoken';
import { secret } from './secret';

// micro next middleware, from github docs
export const authenticated = (fn: NextApiHandler) => async (
  req: NextApiRequest,
  res: NextApiResponse,
) => {
  verify(req.cookies.auth!, secret, async (err, decoded) => {
    if (!err && decoded) {
      return await fn(req, res);
    }

    res.status(401).json({ message: 'You are Not Authenticated' });
  });
};
