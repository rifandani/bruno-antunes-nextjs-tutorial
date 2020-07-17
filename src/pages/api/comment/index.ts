import { openDB } from '../../../openDB';
import { NextApiRequest, NextApiResponse } from 'next';

export default async function comment(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  const db = await openDB();

  if (req.method === 'GET') {
    const comments = await db.all('SELECT * FROM Comment');
    return res.status(200).json(comments);
  } else if (req.method === 'POST') {
    const statement = await db.prepare(
      'INSERT INTO Comment (detail) VALUES (?)',
    );
    const result = await statement.run(req.body.comment);
    result.stmt.finalize();

    const comment = await db.all('SELECT * FROM Comment');
    return res.status(201).json(comment);
  }
}
