import React, { useState, useEffect, memo } from 'react';
import { useParams, useHistory } from "react-router";
import { dateFormat } from '../../../helpers/utils';
import EditModal from '../../EditModal/EditModal'
import { Container, Row, Col, Card, Button } from 'react-bootstrap';
import styles from './singleTask.module.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash, faEdit, faCheck, faHistory } from '@fortawesome/free-solid-svg-icons';
import { connect } from 'react-redux';
import {getSingleTask, removeTask, changeTaskStatus} from '../../../store/actions';



function SingleTask(props){
    const [openEditModal, setOpenEditModal] = useState(false);
    const {id}= useParams();
    const history = useHistory();
    const redirectHome = history.push;
  
    useEffect(()=>{
        props.getSingleTask(id);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);


    useEffect(()=>{
        if(props.editTaskSuccess) {
            setOpenEditModal(false);
        }

    }, [props.editTaskSuccess]);


    const toggleEditModal = ()=>{
        setOpenEditModal(!openEditModal);
        
    }
  
    const task = props.task;
    return(
        <>
            <Container>
                <Row className='justify-content-center'>
                    <Col xs={12}>
                    <div className={`${styles.full} ml-5 font-italic text-secondary`}>The task's full information: </div>
                    {!!task ?
                        <div >
                            <Card className={styles.task}>
                                <Card.Body>
                                    <Card.Title>
                                    <h3 className={`${styles.titleFont} text-info`} >{task.title.toUpperCase()}</h3>
                                    </Card.Title>
                                    <Card.Text 
                                    className='font-italic mb-0'>
                                    Description: 
                                    </Card.Text>
                                    <Card.Text 
                                    className='font-weight-bold text-dark'>
                                    {task.description}
                                    </Card.Text>
                                    <div class="dropdown-divider"></div>
                                    <Card.Text 
                                    className={styles.date}>
                                    <span className={`text-secondary font-italic`}>Status: </span>
                                    <span className={`${task.status==='active' ? styles.activeStatus: styles.doneStatus}`}>{task.status}</span>
                                    </Card.Text>
                                    <Card.Text 
                                    className={`${styles.date} text-secondary mb-0`}>
                                    <span className='font-italic'>Date:</span> {dateFormat(task.date)}
                                    </Card.Text>
                                    <Card.Text className={`${styles.date} text-secondary`}>
                                    <span className='font-italic'>Created at:</span> {dateFormat(task.created_at)}
                                    </Card.Text>
                                    <div className={styles.actionButtons}>
                                    {
                                        task.status === 'active' ?
                                        <Button 
                                        variant="primary" 
                                        className={styles.actionButton}
                                        onClick={()=>props.changeTaskStatus(task._id, {status: 'done'}, 'single')}
                                        >
                                        <FontAwesomeIcon icon={faHistory}/>  
                                        </Button> :
                                        <Button 
                                        variant="success" 
                                        className={styles.actionButton}
                                        onClick={()=>props.changeTaskStatus(task._id, {status: 'active'}, 'single')}
                                        >
                                        <FontAwesomeIcon icon={faCheck}/>  
                                        </Button>
                                    }
                                        <Button 
                                        variant="warning" 
                                        className={styles.actionButton}
                                        onClick={toggleEditModal}
                                        >
                                        <FontAwesomeIcon icon={faEdit}/>  
                                        </Button>

                                        <Button 
                                        variant="danger" 
                                        className={styles.actionButton}
                                        onClick={()=>props.removeTask(task._id, 'single', redirectHome)}
                                        >
                                        <FontAwesomeIcon icon={faTrash}/>   
                                        </Button>
                                    </div>
                                </Card.Body>
                            </Card>
                        </div> :
                        <h1>No task found !!!</h1>
                    }

                    {
                        openEditModal &&
                        <EditModal
                        data = {props.task} 
                        from = 'single'
                        onClose = {toggleEditModal}
                        />
                    }
                    </Col>
                </Row>
            </Container>
        </>
    )
}


const mapStateToProps = state => ({
    task: state.task,
    editTaskSuccess:state.editTaskSuccess
  });

  
const mapDispatchToProps = {
    getSingleTask,
    removeTask,
    changeTaskStatus
    
};
  
  export default connect(mapStateToProps, mapDispatchToProps)(memo(SingleTask));





