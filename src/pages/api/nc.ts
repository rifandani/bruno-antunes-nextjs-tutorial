import { openDB } from '../../openDB';
import handleConnect from '../../handleConnect';

export default handleConnect.get(async (req, res) => {
  const db = await openDB();
  const cars = await db.all(
    'SELECT * FROM Car WHERE year > 2010 ORDER BY year DESC, make ASC',
  );

  res.status(200).json(cars);
});
