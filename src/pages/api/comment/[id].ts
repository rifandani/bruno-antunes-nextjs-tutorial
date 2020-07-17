import { NextApiResponse, NextApiRequest } from 'next';
import { openDB } from '../../../openDB';

export default async function id(req: NextApiRequest, res: NextApiResponse) {
  const db = await openDB();
  // const result = await db.run('DELETE FROM Comment WHERE id = ?', req.query.id);
  const statement = await db.prepare('DELETE FROM Comment WHERE id = ?');
  const result = await statement.run(req.query.id);
  result.stmt.finalize();

  return res.status(200).json({ success: true });
}
