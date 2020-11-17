import React, { Component } from 'react';
import { InputGroup, FormControl, Button } from 'react-bootstrap';
import styles from './addTask.module.css';
import PropTypes from 'prop-types';


class Addtask extends Component {
    state = {
        inputValue: '',
    }

    handleInputChange = (event)=>{
        this.setState({
            inputValue: event.target.value,
        });
    };

    handleKeyDown = (event)=>{
        if(event.key === 'Enter') {
            this.addTask();
        }
    }

    addTask = () =>{
        const {inputValue} = this.state;
        if(!inputValue) {
            return;
        }

        this.props.onAdd(inputValue);

        this.setState({
            inputValue: ''
        });

    };

     render() {
         const {inputValue} = this.state;
         const {disabled} = this.props;

         return(
            <InputGroup className={styles.input}>
                <FormControl
                placeholder="Add New Task"
                aria-label="Add New Task"
                aria-describedby="basic-addon2"
                onChange={this.handleInputChange}
                onKeyDown={this.handleKeyDown}
                value = {inputValue}
                disabled = {disabled}
                />
                <InputGroup.Append>
                    <Button 
                    variant="info"
                    onClick={this.addTask}
                    disabled={!inputValue || disabled}
                    >Add
                    </Button>
                </InputGroup.Append>
            </InputGroup>
         )
     }
};

Addtask.propTypes = {
    onAdd: PropTypes.func.isRequired,
    disabled: PropTypes.bool.isRequired,
}

export default Addtask;

