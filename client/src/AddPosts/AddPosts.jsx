import React, { useEffect, useContext } from 'react';
import { useMutation, gql } from '@apollo/client';
import { GlobalContext } from '../globalContext';
function AddPosts() {
  const { createQuery } = useContext(GlobalContext);
  let inputtitle, inputcontent;
  const [postCreated, { data }] = useMutation(gql`
    mutation AddPost($title: String!, $content: String!){
      postCreated(title: $title, content: $content) {
        id
        title
        content
      }
    }
  `);

  useEffect(() => {
    console.log('data==', data);
    if(data!==undefined & data!==[] ){
    createQuery(data?.postCreated);
  }
  }, [data]);

  return (
    <div>
      <h2>Add Post</h2>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          postCreated({
            variables: {
              title: inputtitle.value,
              content: inputcontent.value,
            }
          });
        }}
      >
        <div>
          <label>Title</label>
          <input
            ref={(node) => {
              inputtitle = node;
            }}
          />
        </div>
        <div>
          <label>Content</label>
          <input
            ref={(node) => {
              inputcontent = node;
            }}
          />
        </div>
        <button type="submit">Add Post</button>
      </form>
    </div>
  );
}

export default AddPosts;
