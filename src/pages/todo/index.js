import React, {useState} from 'react'
import Postit from '../../components/Postit'

import remote from '../../remote'
import local from '../../local'

import { useQuery,useMutation,useApolloClient} from '@apollo/react-hooks';

import './todo.css'

const Todo = () => {

    const client = useApolloClient();
    const [setTodoListClient] = useMutation(local.mutations.setTodoListClient);
    const [createTodo] = useMutation(remote.mutations.saveTodo);

    const [ filteredTodoList,setFilteredTodoList] = useState([])

    const handleOnchange = (e)=>{
        console.log('handleOnChange')
        const value = e.target.value
        const { todoList } = client.readQuery({ query : local.querys.getTodoList})
        const filteredTodoList = todoList.filter((item)=>{
            return  item.title.toLowerCase().indexOf(value) !== -1
        })
        client.writeData({ data : { filteredTodoList : filteredTodoList}})
        setFilteredTodoList(filteredTodoList)
    }

    const handleOnCompleted = (data)=>{
        console.log('handleOnCompleted')
        setTodoListClient({ variables : { todoList : data.getList }})
        // local.writeData({ data: {
        //         todoList :  data.getList
        //     }})
    }
    const onSavePostit = (postit)=>{
        console.log('onSavePostit',postit)
        createTodo({ variables : {
            title : postit.title,
            descricao: postit.text,
            color: postit.color,
            status: 'open',
            user_id: '14'
        }})
        location.reload();
    }

    const { loading, error, data } = useQuery(remote.querys.getTodoList,{onCompleted : handleOnCompleted});

    if (loading) return <div>Loading</div>;

    if (error) return <div>Error</div>;

    const todoList = filteredTodoList.length > 0
        ?  filteredTodoList
        : data.getList

    return(
        <div className='home'>
            <input placeholder='Pesquisar' type='text' className='home__search' onChange={handleOnchange} />
            <div>
                <Postit onSavePostit={onSavePostit} />
                {todoList && todoList.map((item,index)=>(
                    <Postit
                        key={item.id}
                        id={item.id}
                        title={item.title}
                        text={item.descricao}
                        color={item.color}
                        onSavePostit={onSavePostit}
                    />
                ))}
            </div>
        </div>
    )
}

export default Todo
