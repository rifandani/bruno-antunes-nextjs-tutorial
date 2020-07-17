import { CarModel } from '../../../api/Car';
import { GetServerSideProps } from 'next';
import { openDB } from '../../openDB';

export interface IndexProps {
  cars: CarModel[];
}

export default function Index({ cars }: IndexProps) {
  return <pre>{JSON.stringify(cars, null, 4)}</pre>;
}

export const getServerSideProps: GetServerSideProps<IndexProps> = async (
  ctx,
) => {
  const db = await openDB();
  const cars = await db.all('SELECT * FROM Car');

  return {
    props: {
      cars,
    },
  };
};
