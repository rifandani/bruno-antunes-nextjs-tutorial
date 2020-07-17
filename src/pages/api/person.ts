import { NextApiRequest, NextApiResponse } from 'next';
import { openDB } from '../../openDB';
import { authenticated } from '../../../api/auth';

export default authenticated(async function getPerson(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  const db = await openDB();
  const persons = await db.all('SELECT id, name, email FROM Person');

  res.status(200).json(persons);
});
