import React from 'react';
import Task from './Task';

class ToDo extends React.Component {
    state = {
        inputValue: '',
        tasks: []
    };

    handleClick = () =>{
        const {inputValue} = this.state;
        const tasks = [...this.state.tasks]
        tasks.push(inputValue);

        this.setState({
            tasks,
            inputValue: ''
        })
    };


    handleChange = (event)=>{
        this.setState({
            inputValue: event.target.value,
        });
    };


    render() {
        const {tasks, inputValue} = this.state;
        return (
            <>
                <input
                    value = {inputValue}
                    type="text"
                    placeholder = 'Add mew task'
                    onChange={this.handleChange}
                />
                <button
                onClick={this.handleClick}
                >
                Add task
                </button>
                <ol>
                    {tasks.map((el, i)=>{
                        return (
                            <Task 
                                key = {i}
                                value = {el}
                            />
                        )
                    })
                    }
                </ol>
            </> 
        )
    };
};


export default ToDo;
