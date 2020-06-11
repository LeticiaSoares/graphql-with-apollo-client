import React, { Component } from 'react'
import styled from 'styled-components'

const InputStyled = styled.input`
  font-size: 1rem;
  box-sizing: border-box;
  display: block;
  width: 100%;
  padding: 0.8rem;
  margin: 0 0 1rem;
  border: 1px solid black;
  border-radius: 5px;     
  :focus {
    outline: none;
    border-color: #a02a2a;
    box-shadow: 0 0 10px #a02a2a;
  }
`

const Error = styled.p`
  color: red;
`

class Input extends Component {
    constructor(props){
        super(props)
        this.state={
            message : null
        }
        this.value = ''
    }
    handleChange = (e) => {
        this.value = e.target.value
        const regex = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@(([[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
        let message = ''
        if(this.props.required && this.value.trim() === ''){
            message = 'Campo Obrigatório'
        }else if(this.value && this.props.minLength && this.value.length < (this.props.minLength)){
            message = `Digite pelo menos ${this.props.minLength} caracteres`
        }else if(this.props.type==='email' && !regex.test(this.value)){
            message= 'Digite um email válido'
        }
       this.setState({ message : message  },this.props.onChange(e))
    }
    render() {
        return (
            <React.Fragment>
                 <InputStyled
                    onChange={this.handleChange}
                    onBlur={this.handleChange}
                    type={this.props.type}
                    id={this.props.id}
                    placeholder={this.props.placeholder}
                    required={this.props.required}
                    value={this.props.value}
                 />
                <Error>{this.state.message}</Error>
            </React.Fragment>
        )
    }

}

export default Input


