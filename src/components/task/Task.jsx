import React, { useState, memo } from 'react';
import { InputGroup, Button, Card } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash, faEdit } from '@fortawesome/free-solid-svg-icons';
import styles from './task.module.css';
import PropTypes from 'prop-types';
import { dateFormat, descripFormat } from '../../helpers/utils';
import { Link } from 'react-router-dom';
import {connect} from 'react-redux';
import {removeTask} from '../../store/actions';

function Task(props){

    const [checked, setCheck] = useState(false);

    const handleCheck = ()=>{
        setCheck(!checked);

        const {onCheck, data} = props;
        onCheck(data._id);
    }


    const task = props.data;
    const {disabled} = props;

        return(
            <>
            <Card className={`${styles.task} ${checked? styles.selected: ''}`}>
                <Card.Body>
                    <InputGroup.Prepend className={styles.checkbox}>
                        <InputGroup.Checkbox 
                        onClick={handleCheck}
                        />
                    </InputGroup.Prepend>
                    <Card.Title>
                        <Link 
                        to={`/task/${task._id}`} 
                        className="text-info text-decoration-none">
                        <h5>{task.title}</h5>
                        </Link>
                    </Card.Title>
                    <Card.Text 
                    className='font-italic mb-0'>
                    Description: 
                    </Card.Text>
                    <Card.Text 
                    className='font-weight-bold'>
                    {descripFormat(task.description)}
                    </Card.Text>
                    <Card.Text 
                    className={`${styles.date} text-secondary`}>
                    <span className='font-italic'>Date:</span> {dateFormat(task.date)}
                    </Card.Text>
                    <Card.Text className={`${styles.date} text-secondary`}>
                    <span className='font-italic'>Created at:</span> {dateFormat(task.created_at)}
                    </Card.Text>
                    <Button 
                    variant="warning" 
                    className={styles.actionButton}
                    onClick={()=>props.onEdit(task)}
                    disabled = {disabled}
                    >
                    <FontAwesomeIcon icon={faEdit}/>  
                    </Button>

                    <Button 
                    variant="danger" 
                    className={styles.actionButton}
                    onClick={()=>props.removeTask(task._id)}
                    disabled = {disabled}
                    >
                    <FontAwesomeIcon icon={faTrash}/>   
                    </Button>
                </Card.Body>
            </Card>
            </>
        )
};





Task.propTypes = {
    data: PropTypes.object.isRequired,
    onCheck: PropTypes.func.isRequired,
    disabled: PropTypes.bool.isRequired,
}

const mapDispatchToProps = {
    removeTask
};

export default connect(null, mapDispatchToProps)(memo(Task));