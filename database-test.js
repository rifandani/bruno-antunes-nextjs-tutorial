const sqlite = require('sqlite');
const sqlite3 = require('sqlite3');

async function setup() {
  const db = await sqlite.open({
    filename: 'mydb.sqlite',
    driver: sqlite3.Database,
  });

  await db.migrate({ force: 'last' });

  const comment = await db.all('SELECT * FROM Comment ORDER BY id DESC');
  console.log('ALL comment', JSON.stringify(comment, null, 2));

  const person = await db.all(
    'SELECT id, name, email FROM Person ORDER BY id DESC',
  );
  console.log('ALL person', JSON.stringify(person, null, 2));

  const faq = await db.all('SELECT * FROM FAQ ORDER BY createDate DESC'); // .all method returns array of objects , .get returns object
  console.log('ALL faq', JSON.stringify(faq, null, 2));

  const cars = await db.all('SELECT * FROM Car');
  console.log('ALL CARS', JSON.stringify(cars, null, 2));
}

setup();
