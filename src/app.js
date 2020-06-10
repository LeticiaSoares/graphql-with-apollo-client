import React, { useState, Component } from 'react';
import ApolloClient from 'apollo-boost';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { ApolloProvider } from '@apollo/react-hooks';
import { Route, Switch, BrowserRouter } from 'react-router-dom'
import gql from "graphql-tag";
import Login from './pages/login'
import Todo from './pages/todo'
import Navbar from './components/Navbar'
import PrivateRoute from './infra/private-route/private-route'

const cache = new InMemoryCache();

cache.writeData({
    data: {
        session_id: localStorage.getItem('session_id'),
    },
});

const client = new ApolloClient({
    uri: 'http://localhost:4000/',
    cache,
    resolvers: {
        Mutation: {
            setSessionId: (_, { session_id }, { cache, getCacheKey }) => {
                console.log('entrou aqui',session_id)
                const data =  { isLoggedIn : 'leticia'}
                cache.writeData({ data });
                const query = gql`
                    query IsUserLoggedIn {
                        session_id @client
                    }
                `;
                const previous = cache.readQuery({ query });
                console.log('previous',previous)
                return data
            },
        },
        Query: {
            getSessionId : (_, variables,{ cache }) =>{
                console.log('entrou no getSessionId')
                const query = gql`
                    query IsUserLoggedIn {
                        session_id @client
                    }
                `;
                const previous = cache.readQuery({ query });
                console.log('previous',previous)
            },
        }
    },
    request: (operation) => {
        const session_id = localStorage.getItem('session_id')
        const user_id = localStorage.getItem('user_id')
        operation.setContext({
            headers: {
                Authorization: session_id ? `Bearer ${session_id}` : '',
                user_id : user_id ? user_id : ''
            }
        })
    }
});

function App(){
    return (
        <ApolloProvider client={client}>
            <BrowserRouter>
                <Navbar />
                <Switch>
                    <PrivateRoute exact path='/todo' component={Todo}/>
                    <Route path='/login' component={Login} />
                </Switch>
            </BrowserRouter>
        </ApolloProvider>
    )
}

export default App;
