import React, {useEffect, useState} from 'react'
import Postit from '../../components/Postit'
import { useQuery } from '@apollo/react-hooks';
import gql from "graphql-tag";
import './todo.css'

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

    const onFilterPostit = (e) => {
        // const value = e.target.value.toLowerCase()
        // const postits = postits.filter((item)=>{
        //     return  item.title.toLowerCase().indexOf(value) !== -1
        // })
        // this.setState({
        //     postitsFilters : postits
        // })
    }

    const [ postits, setPostits] = useState([])
    const [ postitsFilters, setPostitsFilters] = useState([])
    const postitsToShow = data

    const { loading, error, data } = useQuery(
        GET_LIST
    );
    if (loading) return <div>Loading</div>;
    if (error) return <div>Error</div>;

    console.log('todo',data)

    return(
        <div className='home'>
            <input placeholder='Pesquisar' onChange={onFilterPostit} type='text' className='home__search' />
            <div>
                <Postit/>
                {data && data.getList.map((item,index)=>(
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
