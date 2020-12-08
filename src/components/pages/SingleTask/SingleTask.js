import React, { PureComponent } from 'react';
import { dateFormat } from '../../../helpers/utils';
import EditModal from '../../EditModal/EditModal'
import Spinner from '../../Spinner/Spinner';
import { Container, Row, Col, Card, Button } from 'react-bootstrap';
import styles from './singleTask.module.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash, faEdit } from '@fortawesome/free-solid-svg-icons';


export default class SingleTask extends PureComponent{
    state = {
        task: null,
        openEditModal: false
    }
    componentDidMount(){
        const taskId = this.props.match.params.id;
        fetch(`http://localhost:3001/task/${taskId}`, {
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

            this.setState({
                task:response,
            });
            
        })
        .catch((error)=>{
            console.log('error', error);
        });
    }

    onRemove = ()=> {
        const taskId = this.state.task._id;
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

            this.props.history.push('/');
        })
        .catch((error)=>{
            console.log('error', error);
        });
    }

    toggleEditModal = ()=>{
        this.setState({
            openEditModal: !this.state.openEditModal
        })
        
    }


    saveEditTask = (editTask) => {
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

            this.setState({
                task: response,
                openEditModal: false
            });
        })
        .catch((error)=>{
            console.log('error', error);
        });
    } 


    render(){
        const {task, openEditModal} = this.state;

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
                                        onClick={this.toggleEditModal}
                                        >
                                        <FontAwesomeIcon icon={faEdit}/>  
                                        </Button>

                                        <Button 
                                        variant="danger" 
                                        className={styles.actionButton}
                                        onClick={this.onRemove}
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
                            onSave = {this.saveEditTask}
                            onClose = {this.toggleEditModal}
                            />
                        }
                        </Col>
                    </Row>
                </Container>
            </>
        )
    }

}