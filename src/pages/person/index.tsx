import { NextPageContext, GetServerSideProps } from 'next';
import { myGet } from '../../../api/myGet';

export default function Person({ person }: any) {
  console.log(person);
  return (
    <div>
      <h1>Person Page</h1>
      <span>{JSON.stringify(person, null, 3)}</span>
    </div>
  );
}

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const json = await myGet('http://localhost:3000/api/person', ctx);

  return {
    props: {
      person: json,
    },
  };
};

// Person.getInitalProps = async (ctx: NextPageContext) => {
//   const json = await myGet('http://localhost:3000/api/person', ctx);

//   return {
//     person: json,
//   };
// };
