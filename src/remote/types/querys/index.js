import gql from "graphql-tag";

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

const querys ={
    getTodoList : GET_LIST
}

export default  querys;
