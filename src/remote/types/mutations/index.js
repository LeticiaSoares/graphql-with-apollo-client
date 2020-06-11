import gql from "graphql-tag";

const LOGIN = gql`
    mutation($email:String,$password: String){
        loginUser(email: $email,password: $password){
            id
            session_id
        }
    }
`;


const SAVE_TODO = gql`
    mutation($title: String,$descricao: String,$color: String,$status: String,$user_id: String){
        createTodo(title: $title,descricao : $descricao,color: $color,status : $status,user_id: $user_id) {
             msg
        }
     }
`;

const mutations ={
    login : LOGIN,
    saveTodo: SAVE_TODO
}

export default mutations;
