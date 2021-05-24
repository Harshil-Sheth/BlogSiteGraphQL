import React, { useEffect, useContext } from 'react';
import { useMutation, gql } from '@apollo/client';
import { GlobalContext } from '../globalContext';
import AddIcon from "@material-ui/icons/Add";

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
      <form 
      className="create-note tc"
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
        <input
          className="grow tc"
            name="title"
            placeholder="Title"
            ref={(node) => {
              inputtitle = node;
            }}
          />
         
        </div>
        <div>
        <textarea
          className="grow tc "
          name="content"
          placeholder="Add Description..."
          rows='3'
          ref={(node) => {
              inputcontent = node;
            }}
        />
        </div>
        <button type="submit"><AddIcon /></button>
      </form>
    </div>
  );
}

export default AddPosts;
