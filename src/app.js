import React, { useState } from 'react';
import ApolloClient from 'apollo-boost';
import { ApolloProvider } from '@apollo/react-hooks';
import { Route, Switch, BrowserRouter } from 'react-router-dom'
import Login from './pages/login'
import Todo from './pages/todo'
import Navbar from './components/Navbar'
import Alert from './components/Alert'
import PrivateRoute from './infra/private-route/private-route'
import { mutations,querys } from "./local/resolvers";
import local from "./local";
import {InMemoryCache} from "apollo-cache-inmemory";

const cache = new InMemoryCache();

cache.writeData({
    data: {
        session_id: localStorage.getItem('session_id'),
        user_id: localStorage.getItem('user_id'),
        todoList: [],
    },
});


const client = new ApolloClient({
        uri: 'http://localhost:4000/',
        cache,
        resolvers:{
            Mutation:{
                setTodoListClient : (_root, { todoList }, { cache, getCacheKey }) => {
                    console.log('setTodoListClient',todoList)
                    cache.writeData({data : {todoList}})
                }
            },
            Query :{
                ...querys
            }
        },
        request: ({ setContext }) => {
            const session_id = localStorage.getItem('session_id')
            const user_id = localStorage.getItem('user_id')
            setContext({
                headers: {
                    Authorization: session_id ? `${session_id}` : '',
                    user_id: user_id ? user_id : ''
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
