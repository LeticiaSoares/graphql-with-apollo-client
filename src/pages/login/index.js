import React, { useRef } from 'react'
import { useMutation } from '@apollo/react-hooks';
import gql from "graphql-tag";
import Form from "../../components/Form"
import Input from '../../components/Form/Input'
import Label from '../../components/Form/Label'
import Button from '../../components/Form/Button'
import Container from '../../components/Container'

const LOGIN = gql`
    mutation($email:String,$password: String){
        loginUser(email: $email,password: $password){
            id
            session_id
        }   
    }      
`;

const SET_SESSION_ID = gql`
    mutation SetSessionId($session_id: String) {
        setSessionId(session_id: $session_id) @client
    }
`;

const Login = () => {

    const email = useRef('');
    const password = useRef('');

    const [setSessionId] = useMutation(SET_SESSION_ID);

    const handleOnCompleted = (data) =>{
        const result = data.loginUser
        console.log('result',result)
        const session_id = result.session_id
        if(result.error){
            alert('Usuário não encontrado!')
        }else{
            alert('Usuário encontrado')
            console.log('result',result)
            setSessionId({ variables : { session_id : session_id }})
            localStorage.setItem('session_id',result.session_id)
            localStorage.setItem('user_id',result.id)
            window.location.href = '/todo'
        }
    }

    const [loginUser, { data }] = useMutation(LOGIN, {onCompleted : handleOnCompleted});

    const handleOnSubmit =(e)=>{
        e.preventDefault()
        const user = {
            email : email.current.props.value,
            password : password.current.props.value
        }
        loginUser({ variables: { ...user }})
    }
    return (
        <Container>
            <Form title='Login' text='Entre com Seu Email e Senha' onSubmit={handleOnSubmit}>
                <Label>Email</Label>
                <Input ref={email} type="email" value='leticia.soares@gympass.com'/>
                <Label>Senha</Label>
                <Input ref={password} type="password" value='123'/>
                <Button>Entrar</Button>
            </Form>
        </Container>
    )
}

export default Login
