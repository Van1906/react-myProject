import React, { PureComponent } from 'react';
import { InputGroup, Button, Card } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash, faEdit } from '@fortawesome/free-solid-svg-icons';
import styles from './task.module.css';
import PropTypes from 'prop-types';

class Task extends PureComponent {
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

    componentWillUnmount(){
        console.log('Task componentWillUnmpint')
    }
   
    render() {
        console.log('Task render')
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

                    <Card.Title className="text-info" >{task.title}</Card.Title>
                    <Card.Text>{task.description}</Card.Text>

                    <Button 
                    variant="warning" 
                    className={styles.actionButton}
                    onClick={()=>this.props.onEdit(task)}
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
};


Task.propTypes = {
    data: PropTypes.object.isRequired,
    onRemove: PropTypes.func.isRequired,
    onCheck: PropTypes.func.isRequired,
    disabled: PropTypes.bool.isRequired,
}

export default Task;