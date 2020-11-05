import React from 'react';
import Task from './task/Task';
import { ListGroup, InputGroup, FormControl, Button } from 'react-bootstrap';


class ToDo extends React.Component {
    state = {
        inputValue: '',
        tasks: []
    };

    handleClick = () =>{
        const {inputValue} = this.state;
        const tasks = [...this.state.tasks]
        if(inputValue !== '') {
            tasks.push(inputValue);
        }
       
        // console.log(this.state);
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
                <InputGroup className="mb-3 mt-3">
                    <FormControl
                        value = {inputValue}
                        type="text"
                        placeholder = 'Add new task'
                        onChange={this.handleChange}
                    />
                    <InputGroup.Append>
                    <Button 
                        onClick={this.handleClick}
                        variant="info">
                        Add Task
                    </Button>
                    </InputGroup.Append>
                </InputGroup>
                <ListGroup>
                    {tasks.map((el, i)=>{
                        return (
                            <Task 
                                key = {i}
                                value = {el}
                            />
                        )
                    })
                    }
                </ListGroup>
            </> 
        )
    };
};


export default ToDo;
