import gql from "graphql-tag";

export const typeDefs = gql`
    extend type Query {
        sessionId: String
        userId: String
        todoList: [Object]
        filteredTodoList: [Object]
    }
`;

export const resolvers = {
    Query : {
        getTodoList : (_,args,{ cache })=>{
            console.log('getTodoList')
            const { todoList } = cache.readQuery({ query : GET_TODO_LIST})
            return todoList
        }
    }
   ,
};

