// for pagination cars

import Ssgcars, { getStaticProps } from '../index';
import { GetStaticPaths } from 'next';
import { openDB } from '../../../openDB';

export default Ssgcars;
export { getStaticProps };

export const getStaticPaths: GetStaticPaths = async () => {
  const db = await openDB();
  const { total } = await db.get('SELECT count(*) AS total FROM Car');
  // jika total = 16, maka kita ingin numberOfPages = 6, bukan 5
  // dibulatkan ke atas, bukan ke terdekat = Math.round()
  const numberOfPages = Math.ceil(total / 5.0);

  // convert angka dari numberOfPages menjadi jumlah Array baru
  const arr = Array(numberOfPages - 1).fill('');
  const paths = arr.map((el, index) => {
    return { params: { currentPage: (index + 1).toString() } };
  });

  return {
    fallback: false,
    paths,
  };
};
