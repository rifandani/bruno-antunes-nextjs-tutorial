import { NextApiRequest, NextApiResponse } from 'next';
import { openDB } from '../../openDB';
import bcrypt from 'bcrypt';
import { sign } from 'jsonwebtoken';
import { secret } from '../../../api/secret';
import cookie from 'cookie';

export default async function login(req: NextApiRequest, res: NextApiResponse) {
  const db = await openDB();

  if (req.method === 'POST') {
    // returns an object
    const person = await db.get('SELECT * FROM Person WHERE email = ?', [
      req.body.email,
    ]);

    // TODO: validate if person is defined

    bcrypt.compare(req.body.password, person.password, (err, result) => {
      if (!err && result) {
        const claims = { sub: person.id, personEmail: person.email };
        const jwt = sign(claims, secret, { expiresIn: '1h' });
        // set cookie to headers
        res.setHeader(
          'Set-Cookie',
          cookie.serialize('auth', jwt, {
            httpOnly: true,
            secure: process.env.NODE_ENV !== 'development',
            sameSite: 'strict',
            maxAge: 3600,
            path: '/',
          }),
        );

        res.json({ message: 'You are logged in' });
      } else {
        res.json({ message: 'something went wrong' });
      }
    });
  } else {
    res.status(405).json({ message: 'Only support POST req' });
  }
}
