import React, { PureComponent } from 'react';
import { InputGroup, Button, Card } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash, faEdit } from '@fortawesome/free-solid-svg-icons';
import styles from './task.module.css';
import PropTypes from 'prop-types';
import { dateFormat } from '../../helpers/utils'

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
                        onClick={this.handleCheck}
                        />
                    </InputGroup.Prepend>
                    <Card.Title className="text-info"><h4>{task.title}</h4></Card.Title>
                    <Card.Text className='font-italic mb-0'>Description: </Card.Text>
                    <Card.Text className='font-weight-bold'>{task.description}</Card.Text>
                    <Card.Text className={`${styles.date} text-secondary`}><span className='font-italic'>Date:</span> {dateFormat(task.date)}</Card.Text>
                    <Card.Text className={`${styles.date} text-secondary`}><span className='font-italic'>Created at:</span> {dateFormat(task.created_at)}</Card.Text>
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