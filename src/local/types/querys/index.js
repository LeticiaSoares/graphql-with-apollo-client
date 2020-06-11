import gql from "graphql-tag";

const GET_TODO_LIST = gql`
    query getTodoList {
        todoList @client {
            id
            title
            descricao
            status
            color
        }
    }
`;

const GET_USER_ID = gql`
    query getUserId {
        userId @client
    }
`;

const querys ={
    getTodoList : GET_TODO_LIST,
    getUserId : GET_USER_ID
}

export default querys;
