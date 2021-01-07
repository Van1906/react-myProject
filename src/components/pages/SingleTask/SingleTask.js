import React, { useState, useEffect, memo } from 'react';
import { useParams, useHistory } from "react-router";
import { dateFormat } from '../../../helpers/utils';
import EditModal from '../../EditModal/EditModal'
import Spinner from '../../Spinner/Spinner';
import { Container, Row, Col, Card, Button } from 'react-bootstrap';
import styles from './singleTask.module.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash, faEdit } from '@fortawesome/free-solid-svg-icons';



function SingleTask(){
    const [task, setTask] = useState(null);
    const [openEditModal, setOpenEditModal] = useState(false);
    const {id}= useParams();
    const history = useHistory();

    useEffect(()=>{
        fetch(`http://localhost:3001/task/${id}`, {
            method: 'GET',
            headers: {
                "Content-Type": "application/json"
            }
        })
        .then((res)=> res.json())
        .then((response)=>{
            if(response.error) {
                throw response.error;
            }

            setTask(response);
            
        })
        .catch((error)=>{
            console.log('error', error);
        });
    }, [id]);


    const onRemove = ()=> {
        const taskId = task._id;
        fetch(`http://localhost:3001/task/${taskId}`, {
            method: 'DELETE',
            headers: {
                "Content-Type": "application/json"
            }
        })
        .then((res)=> res.json())
        .then((response)=>{
            if(response.error) {
                throw response.error;
            }

            history.push('/');
        })
        .catch((error)=>{
            console.log('error', error);
        });
    }

    const toggleEditModal = ()=>{
        setOpenEditModal(!openEditModal);
        
    }


    const saveEditTask = (editTask) => {
        fetch(`http://localhost:3001/task/${editTask._id}`, {
            method: 'PUT',
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(editTask)
        })
        .then((res)=> res.json())
        .then((response)=>{
            if(response.error) {
                throw response.error;
            }

            setTask(response);
            setOpenEditModal(false);
        })
        .catch((error)=>{
            console.log('error', error);
        });
    } 

    return(
        <>
            <Container fluid>
                <Row className='justify-content-center'>
                    <Col xs={12}>
                    {!!task ?
                        <div >
                            <Card className={styles.task}>
                                <Card.Body>
                                    <Card.Title>
                                    <h3 className={`${styles.titleFont} text-info`} >{task.title}</h3>
                                    </Card.Title>
                                    <Card.Text 
                                    className='font-italic mb-0'>
                                    Description: 
                                    </Card.Text>
                                    <Card.Text 
                                    className='font-weight-bold'>
                                    {task.description}
                                    </Card.Text>
                                    <Card.Text 
                                    className={`${styles.date} text-secondary mb-0`}>
                                    <span className='font-italic'>Date:</span> {dateFormat(task.date)}
                                    </Card.Text>
                                    <Card.Text className={`${styles.date} text-secondary`}>
                                    <span className='font-italic'>Created at:</span> {dateFormat(task.created_at)}
                                    </Card.Text>
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
                                    onClick={onRemove}
                                    >
                                    <FontAwesomeIcon icon={faTrash}/>   
                                    </Button>
                                </Card.Body>
                            </Card>
                        </div> :
                        <Spinner />
                    }

                    {
                        openEditModal &&
                        <EditModal
                        data = {task} 
                        onSave = {saveEditTask}
                        onClose = {toggleEditModal}
                        />
                    }
                    </Col>
                </Row>
            </Container>
        </>
    )
}

export default memo(SingleTask);