import { useState } from 'react';
import useSWR, { trigger, mutate } from 'swr';
import axios from 'axios';
import { GetStaticProps } from 'next';

export default function Home({ comments }: any) {
  const [comment, setComment] = useState({ comment: '' });

  const { data } = useSWR('/comment', { initialData: comments });

  const handleSubmit = async (e) => {
    e.preventDefault();

    mutate('/comment', [...data, comment], false);
    await axios.post('/comment', comment);
    trigger('/comment');

    setComment({ comment: '' });
  };

  return (
    <div>
      <h1>All tutorial from Bruno Antunes is here</h1>
      <h3>API calls using SWR</h3>
      <div>
        <h5>Total Comments: {data?.length}</h5>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            name="comment"
            value={comment.comment}
            onChange={(e) => setComment({ comment: e.target.value })}
          />
          <input type="submit" value="Submit" />
        </form>
        <ul>
          {data?.map((comment) => (
            <li
              key={comment.id}
              style={{
                display: 'flex',
                flexDirection: 'row',
                justifyContent: 'space-between',
              }}
            >
              {comment.detail}
              <button
                onClick={async () => {
                  mutate(
                    '/comment',
                    data.filter((el) => el.id !== comment.id),
                    false,
                  );
                  await axios.delete(`/comment/${comment.id}`);
                  trigger('/comment');
                }}
              >
                Delete
              </button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export const getStaticProps: GetStaticProps = async (ctx) => {
  const { data } = await axios.get('/comment');

  return {
    props: {
      comments: data,
    },
  };
};
