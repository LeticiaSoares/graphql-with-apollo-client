import React, {useEffect, useState} from 'react'
import Postit from '../../components/Postit'
import {useApolloClient, useQuery} from '@apollo/react-hooks';
import gql from "graphql-tag";
import './todo.css'
import Button from "../../components/Form/Button";

const GET_LIST = gql`
    query{
        getList{
            id
            title
            descricao
            status
            color
        }
    }
`;
const Todo = () => {
    const [ filteredTodoList,setFilteredTodoList] = useState([])

    const handleOnCompleted = (data)=>{
        client.writeData({ data: {
                todoList :  data.getList
        }})
    }
    const GET_TODO = gql`
        query getTodo {
            todoList @client {
                id
                title
            }
        }
    `;

    const handleOnchange = (e)=>{
        const value = e.target.value
        const { todoList } = client.readQuery({ query : GET_TODO})
        console.log('todoList',todoList)
        const filteredTodoList = todoList.filter((item)=>{
            console.log('item',item)
            return  item.title.toLowerCase().indexOf(value) !== -1
        })
        console.log('filteredTodo',filteredTodoList)
        client.writeData({ data : { filteredTodoList : filteredTodoList}})
        setFilteredTodoList(filteredTodoList)
    }
    const { loading, error, data, client } = useQuery(
        GET_LIST,{
            onCompleted : handleOnCompleted
        }
    );

    if (loading) return <div>Loading</div>;

    if (error) return <div>Error</div>;
    console.log('filteredTodoList',filteredTodoList)
    console.log('data',data.getList)
    const todoList = filteredTodoList.length > 0
        ?  filteredTodoList
        : data.getList

    return(
        <div className='home'>
            <input placeholder='Pesquisar' type='text' className='home__search' onChange={handleOnchange} />
            <div>
                <Postit/>
                {todoList && todoList.map((item,index)=>(
                    <Postit
                        key={item.id}
                        id={item.id}
                        title={item.title}
                        text={item.descricao}
                        color={item.color}
                        //updatePostits={this.getPostits}
                    />
                ))}
            </div>
        </div>
    )
}

export default Todo
