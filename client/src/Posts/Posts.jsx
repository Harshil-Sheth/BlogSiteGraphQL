import React, { useContext, useEffect, useState } from 'react';
import { useQuery, gql } from '@apollo/client';
import { GlobalContext } from '../globalContext';
function Posts() {
  const { getQuery, posts } = useContext(GlobalContext);
  const [postList, setPostList] = useState([]);
  const { loading, error, data } = useQuery(gql`
    {
      posts {
        id
        title
        content
      }
    }
  `);

  useEffect(() => {
    getQuery(data?.posts);
    setPostList(posts);
  }, [data]);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error : {error}</p>;
  return posts ? 
  posts.map(({ id, title, content }) => (
      <div className="artical note tc helvetica" key={id}>
        <h2>{title}</h2>
        <p>{content}</p>
      </div>
    )) : (
    <></>
  );
}

export default Posts;
