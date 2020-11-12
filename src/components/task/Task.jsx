import React, { Component } from 'react';
// import { ListGroup } from 'react-bootstrap';
import { InputGroup, Button, Card } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash, faEdit } from '@fortawesome/free-solid-svg-icons';
import styles from './task.module.css'

class Task extends Component {
    state = {
        checked: false
    };

    handleCheck = ()=>{
        this.setState({
            checked: !this.state.checked
        });


        const {onCheck, data} = this.props;
        onCheck(data._id);
    }
   
    render() {
        const task = this.props.data;
        const {checked} = this.state;
        const {disabled} = this.props;
        return(
            <>
            <Card className={`${styles.task} ${checked? styles.selected: ''}`}>
                <Card.Body>
                    <InputGroup.Prepend>
                        <InputGroup.Checkbox 
                        aria-label="Checkbox for following text input"
                         onClick={this.handleCheck}
                        />
                    </InputGroup.Prepend>

                    <Card.Title>{task.text.slice(0, 10)  + '...'}</Card.Title>
                    <Card.Text>{task.text}</Card.Text>

                    <Button 
                    variant="warning" 
                    className={styles.actionButton}
                    disabled = {disabled}
                    >
                    <FontAwesomeIcon icon={faEdit}/>   
                    </Button>

                    <Button 
                    variant="danger" 
                    className={styles.actionButton}
                    onClick={()=>this.props.onRemove(task._id)}
                    disabled = {disabled}
                    >
                    <FontAwesomeIcon icon={faTrash}/>   
                    </Button>
                </Card.Body>
            </Card>
            </>
        )
        
    }

}

export default Task;