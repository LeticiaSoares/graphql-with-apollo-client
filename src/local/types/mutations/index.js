import gql from "graphql-tag";

const SET_TODO_LIST_CLIENT = gql`
    mutation SetTodoListClient($todoList : [String]) {
        setTodoListClient(todoList: $todoList) @client
    }
`;

const mutations = {
    setTodoListClient : SET_TODO_LIST_CLIENT
}

export default mutations
