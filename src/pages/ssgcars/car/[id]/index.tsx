import { CarModel } from '../../../../../api/Car';
import { GetStaticProps, GetStaticPaths } from 'next';
import { openDB } from '../../../../openDB';
import { useRouter } from 'next/router';

export interface CarDetailProps extends CarModel {
  // export type CarDetail = CarModel
}

export default function CarDetail({
  id,
  price,
  make,
  model,
  photoUrl,
}: CarDetailProps) {
  const router = useRouter();
  if (router.isFallback) {
    return <div>Loading Data...</div>;
  }

  return (
    <div>
      <div>{id}</div>
      <div>{make}</div>
      <div>{model}</div>
      <div>{price}</div>
      <div>{photoUrl}</div>
    </div>
  );
}

export const getStaticProps: GetStaticProps<CarDetailProps> = async (ctx) => {
  const id = ctx.params.id as string;
  const db = await openDB();

  // + id auto parse to INT
  // returns one object
  const car = await db.get('SELECT * FROM Car WHERE id = ?', +id);

  return {
    props: car, // props berisi satu object car
  };
};

// id string karena ngambil dari parameter query URL
export const getStaticPaths: GetStaticPaths<{ id: string }> = async () => {
  const db = await openDB();
  const cars = await db.all('SELECT * FROM Car');
  const carsIds = cars.map((car) => {
    return { params: { id: car.id.toString() } };
  });

  return {
    // if false, only the defined params is rendered, the rest is 404
    // if true, all the cars is rendered
    fallback: true,
    // should be an array, like this
    // [ { params: { id: '6' } }, { params: { id: '7' } }, { params: { id: '8' } } ]
    paths: carsIds,
  };
};
