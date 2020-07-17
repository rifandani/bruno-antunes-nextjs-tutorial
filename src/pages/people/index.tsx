import { GetServerSideProps } from 'next';

export interface PeopleProps {
  names: string[];
}

export default function People({ names }: PeopleProps) {
  return (
    <div>
      {names.map((name, index) => (
        <h3 key={index}>{name}</h3>
      ))}
    </div>
  );
}

export const getServerSideProps: GetServerSideProps<PeopleProps> = async (
  ctx,
) => {
  return {
    props: {
      names: ['john', 'doe', 'rifandani', 'rizki', 'tri'],
    },
  };
};
