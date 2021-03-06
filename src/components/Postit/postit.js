import React from 'react'
import Form from '../Form'

import './postit.css'

class Postit extends React.Component {
    constructor(props){
        super(props)
        this.state = {
            id: this.props.id ? this.props.id : null,
            title: this.props.title ? this.props.title : '',
            text: this.props.text ? this.props.text : '',
            editing : false,
            color : this.props.color ? this.props.color   : 'rgb(239, 203, 207)'
        }
    }
    handlePostitClick = () => {
        console.log('handlePostitClick')
        this.setState({
            editing :  true
        })
    }
    handlePostitRemove = (e) =>{
        console.log('handlePostitRemove')
        e.stopPropagation()
        const id =  this.state.id
    }
    handlePostitSubmit = (e) => {
        e.preventDefault()

        if(this.state.id){
            const postit = {
                title :  this.state.title,
                text :  this.state.text,
                id : this.state.id,
                color: this.state.color
            }

        }else{

            const postit = {
                title :  this.state.title,
                text :  this.state.text,
                color: this.state.color
            }
            this.props.onSavePostit(postit)
        }
    }
    setTitle = (e) => {
        const inputTitle = e.target.value
        console.log('evento ',e)
        this.setState({
            title : inputTitle
        })
    }
    setText = (event) => {
        const inputText = event.target.value
        this.setState({
            text :  inputText
        })
    }
    setColor = (e) =>{
       this.setState({
           color : e.target.value
       })
    }
    render() {
        return (
            <div onClick={this.handlePostitClick} className='postit' style={{ background : this.state.color }}>
                <input className='postit__color' type='color' onChange={this.setColor}/>
                <Form onSubmit={this.handlePostitSubmit}>
                    {this.state.editing  && (
                                <button
                                    type='button'
                                    onClick={this.handlePostitRemove}
                                    className='postit__button-remove'
                                >
                                   X
                                </button>
                            )

                    }
                    <div className='postit__form'>
                        <input
                            type='text'
                            className='postit__title'
                            placeholder='Título'
                            name='title'
                            value={this.state.title}
                            onChange={this.setTitle}
                        />
                        <textarea
                            className='postit__text'
                            placeholder='Digite o texto...'
                            name='text'
                            value={this.state.text}
                            onChange={this.setText}
                        />
                        {this.state.editing &&
                        (<button className='postit__button-completed'>
                            Concluído
                        </button>)
                        }
                    </div>
                </Form>
            </div>
        )
    }
}

export default Postit
