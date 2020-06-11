import React, { useState } from 'react'
import {useApolloClient, useMutation} from '@apollo/react-hooks';
import remote from '../../remote'
import Form from "../../components/Form"
import Input from '../../components/Form/Input'
import Label from '../../components/Form/Label'
import Button from '../../components/Form/Button'
import Container from '../../components/Container'


const Login = ({openAlert}) => {
    const [ email, setEmail ] = useState()
    const [ password, setPassword ] = useState()

    const cache = useApolloClient();

    const onSuccess = ({ session_id,id})=>{
        localStorage.setItem('session_id',session_id)
        localStorage.setItem('user_id',id)
        cache.writeData({ data: { session_id: session_id}})
        window.location.href = '/'
    }

    const handleOnCompleted = (data) =>{
        console.log('handleOnCompleted',data.loginUser)
        const result = data.loginUser
        if(result.error || !result.session_id){
            openAlert('Usuário não encontrado!')
        }else{
            onSuccess(result)
        }
    }

    const handleOnSubmit =(e)=>{
        e.preventDefault()
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
    const LOGIN = gql`
        mutation($email:String,$password: String){
            loginUser(email: $email,password: $password){
                id
                session_id
            }
        }
    `;

    const [loginUser, { error,loading }] = useMutation(LOGIN, {onCompleted : handleOnCompleted});

    if(loading) return <div>Carregando</div>
    if(error) return <p>Error</p>

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
