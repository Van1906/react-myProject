import React, { useState, memo } from 'react';
import { InputGroup, Button, Card } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash, faEdit, faCheck, faHistory } from '@fortawesome/free-solid-svg-icons';
import styles from './task.module.css';
import PropTypes from 'prop-types';
import { dateFormat, trimString } from '../../helpers/utils';
import { Link } from 'react-router-dom';
import {connect} from 'react-redux';
import { removeTask, changeTaskStatus } from '../../store/actions';

function Task(props){

    const [checked, setCheck] = useState(false);

    const handleCheck = ()=>{
        setCheck(!checked);

        const {onCheck, data} = props;
        onCheck(data._id);
    };


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
                        <h5>{trimString(task.title.toUpperCase(), 20)}</h5>
                        </Link>
                    </Card.Title>
                    <Card.Text 
                    className='font-italic mb-0'>
                    Description: 
                    </Card.Text>
                    <Card.Text 
                    className='font-weight-bold text-dark'>
                    {trimString(task.description, 50)}
                    </Card.Text>
                    <div class="dropdown-divider"></div>
                    <Card.Text 
                    className={styles.date}>
                    <span className={`text-secondary font-italic`}>Status: </span>
                    <span className={`${task.status==='active' ? styles.activeStatus: styles.doneStatus}`}>{task.status}</span>
                    </Card.Text>
                    <Card.Text 
                    className={`${styles.date} text-secondary`}>
                    <span className='font-italic'>Date:</span> {dateFormat(task.date)}
                    </Card.Text>
                    <Card.Text className={`${styles.date} text-secondary`}>
                    <span className='font-italic'>Created at:</span> {dateFormat(task.created_at)}
                    </Card.Text>
                    <div className={styles.actionButtons}>
                        {
                            task.status === 'active' ?
                            <Button 
                            variant="success" 
                            className={styles.actionButton}
                            onClick={()=>props.changeTaskStatus(task._id, {status: 'done'}, 'tasks')}
                            disabled = {disabled}
                            >
                            <FontAwesomeIcon icon={faCheck}/>  
                            </Button> :
                            <Button 
                            variant="primary" 
                            className={styles.actionButton}
                            onClick={()=>props.changeTaskStatus(task._id, {status: 'active'}, 'tasks')}
                            disabled = {disabled}
                            >
                            <FontAwesomeIcon icon={faHistory}/>  
                            </Button>
                        }

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
                    </div>
                </Card.Body>
            </Card>
            </>
        );
};


Task.propTypes = {
    data: PropTypes.object.isRequired,
    onCheck: PropTypes.func.isRequired,
    disabled: PropTypes.bool.isRequired,
    onEdit: PropTypes.func.isRequired
}

const mapDispatchToProps = {
    removeTask,
    changeTaskStatus
};

export default connect(null, mapDispatchToProps)(memo(Task));