import styled from 'styled-components'

const Button =  styled.button`
    color: white;
    font-size: 1.3rem;
    font-weight: bold;
    width: 100%;
    padding: 0.8rem;
    margin-bottom: 1rem;
    background: #6968d5;
    border: 1px solid #6968d5;
    border-radius: 5px;
    ${({disabled})=> disabled && css`
      color: gray;
      background: lightgrey;
      border-color: lightgrey;
    `}
`

export default Button
