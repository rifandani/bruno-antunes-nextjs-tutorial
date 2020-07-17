import { openDB } from '../../openDB';
import handleConnect from '../../handleConnect';

export default handleConnect
  .get(async (req, res) => {
    const db = await openDB();
    const cars = await db.all('SELECT * FROM Car');

    // extract from middleware
    res.status(200).json({ name: req.username, userId: req.userId, cars });
  })
  .post(async (req, res) => {
    // check if admin from middleware
    if (req.username !== 'admin') {
      return res.status(401).json({ msg: 'Sorry you are not admin' });
    }

    const dbPost = await openDB();
    const { lastID } = await dbPost.run(
      'INSERT INTO Car (make, model) VALUES (?, ?)',
      req.body.make,
      req.body.model,
    );

    res.status(201).json({ ...req.body, id: lastID });
  });
