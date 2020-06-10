import React from 'react'
import styled from 'styled-components'

const Form = styled(({title,text,children,onSubmit,className}) =>(
    <form className={className} onSubmit={onSubmit}>
        <h2>{title}</h2>
        <p>{text}</p>
        {children}
    </form>
))`
    font-family: monospace;
    width: 100%; 
    h2 {
        color: #a02a2a;
    }
    p {
        font-size: 16px;
    }
`

export default Form
