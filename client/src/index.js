import React from "react";
import { render } from "react-dom";
import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
} from "@apollo/client";
import './new.css'

import { GlobalProvider } from './globalContext';
import Posts from './Posts/Posts';
import CreateArticals from './AddPosts/AddPosts';

const client = new ApolloClient({
  uri: "http://localhost:8000/graphql",
  cache: new InMemoryCache()
});

function App() {
  return (
    <ApolloProvider client={client}>
      <GlobalProvider><div >
        <h2>BlogSite</h2>
        <div className='new'>
          <CreateArticals />
        </div>
          <Posts />
        </div>
      </GlobalProvider>
    </ApolloProvider>
  );
}

render(<App />, document.getElementById("root"));
