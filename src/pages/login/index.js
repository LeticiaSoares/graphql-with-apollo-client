import React, { useState } from 'react'
import {useApolloClient, useMutation} from '@apollo/react-hooks';
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



const Login = ({openAlert}) => {
    const [ email, setEmail ] = useState()
    const [ password, setPassword ] = useState()

    const [setSessionId] = useMutation(SET_SESSION_ID);
    const client = useApolloClient();

    const handleOnCompleted = (data) =>{
        const result = data.loginUser
        const session_id = result.session_id
        console.log('result',result)
        if(result.error || !result.session_id){
            openAlert('Usuário não encontrado!')
        }else{
            openAlert('Usuário encontrado!')
            localStorage.setItem('sessionId',result.session_id)
            localStorage.setItem('userId',result.id)
            client.writeData({ data: { session_id: session_id}})
            window.location.href = '/'
        }
    }

    const [loginUser, { data, error,loading }] = useMutation(LOGIN, {onCompleted : handleOnCompleted});

    if(loading) return <div>Carregando</div>
    if(error) return <p>Error</p>

    const handleOnSubmit =(e)=>{
        e.preventDefault()
        console.log('email',email)
        console.log('password',password)
        const user = {
            email : email,
            password: password
        }
        loginUser({ variables: { ...user }})
    }
    const handleChangeEmail = (e)=>{
        setEmail(e.target.value)
    }
    const handleChangePassword = (e)=>{
        setPassword(e.target.value)
    }
    return (
        <Container>
            <Form title='Login' text='Entre com Seu Email e Senha' onSubmit={handleOnSubmit}>
                <Label>Email</Label>
                <Input onChange={handleChangeEmail} value={email} type="email"/>
                <Label>Senha</Label>
                <Input onChange={handleChangePassword} value={password} type="password"/>
                <Button>Entrar</Button>
            </Form>
        </Container>
    )
}

export default Login
