import React, { createContext, useReducer, useEffect } from 'react';
import { getpostQuery, postQuery } from './actions';
import { reducer } from './reducers';

const initialState = {
    posts: [],
};

export const GlobalContext = createContext(initialState);

export const GlobalProvider = ({ children }) => {
    const [state, dispatch] = useReducer(reducer, initialState);
    const getQuery = (payload) => {
        dispatch(getpostQuery(payload));
    };
    
    const createQuery = (payload) => {
        dispatch(postQuery(payload));
    };
    return (
        <GlobalContext.Provider value={{
            posts: state.posts,
            getQuery,
            createQuery
        }}>
            {children}
        </GlobalContext.Provider>
    );
}
