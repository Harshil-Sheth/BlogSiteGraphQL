import React, { useContext, useEffect, useState } from 'react';
import { useQuery, gql } from '@apollo/client';
import { GlobalContext } from '../globalContext';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';


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
      <div className="note tc" key={id}>
      <CardActionArea>
        <CardContent>
          <Typography gutterBottom variant="h5" component="h2">
          {title}
          </Typography>
          <Typography variant="body2" color="textSecondary" component="p">
          {content}
          </Typography>
        </CardContent>
      </CardActionArea>
      </div>
    )) : (
    <></>
  );
}

export default Posts;
