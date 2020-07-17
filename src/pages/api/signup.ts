import { NextApiRequest, NextApiResponse } from 'next';
import { openDB } from '../../openDB';
import bcrypt from 'bcrypt';

export default async function signup(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  const db = await openDB();

  if (req.method === 'POST') {
    bcrypt.hash(req.body.password, 10, async (err, hash) => {
      // store hash in your password
      // TODO: check name/email is valid, not empty & not the same from the database

      const statement = await db.prepare(
        'INSERT INTO Person (name, email, password) VALUES (?, ?, ?)',
      );
      const result = await statement.run(req.body.name, req.body.email, hash);
      result.stmt.finalize();

      const person = await db.all('SELECT name, email FROM Person');
      res.json(person);
    });
  } else {
    res.status(405).json({ message: 'Only support POST req' });
  }
}
