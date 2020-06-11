import React, { useState } from 'react';
import ApolloClient from 'apollo-boost';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { ApolloProvider } from '@apollo/react-hooks';
import { Route, Switch, BrowserRouter } from 'react-router-dom'
import gql from "graphql-tag";
import Login from './pages/login'
import Todo from './pages/todo'
import Navbar from './components/Navbar'
import Alert from './components/Alert'
import PrivateRoute from './infra/private-route/private-route'
import { typeDefs,resolvers } from "./resolvers";

const cache = new InMemoryCache();

cache.writeData({
    data: {
        sessionId: localStorage.getItem('sessionId'),
        userId: localStorage.getItem('userId'),
        todoList: []
    },
});

const client = new ApolloClient({
        uri: 'http://localhost:4000/',
        cache,
        typeDefs,
        resolvers,
        request: ({ setContext }) => {
            const sessionId = localStorage.getItem('sessionId')
            const userId = localStorage.getItem('userId')
            setContext({
                headers: {
                    Authorization: sessionId ? `${sessionId}` : '',
                    user_id: userId ? userId : ''
                }
            })
        }
})

function App(){
    const [ message, setMessage] = useState('')
    const onCloseAlert = ()=>{
        setMessage(false)
    }
    return (
        <ApolloProvider client={client}>
            <BrowserRouter>
                <Navbar />
                <Switch>
                    <PrivateRoute exact path='/' component={Todo}/>
                    <Route path='/login' render={()=> <Login openAlert={setMessage}/>}/>
                </Switch>
                <Alert message={message} handleOnClick={onCloseAlert} />
            </BrowserRouter>
        </ApolloProvider>
    )
}

export default App;
