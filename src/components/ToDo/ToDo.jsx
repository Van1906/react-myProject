import React from 'react';
// import Task from '../task/Task';
import idGenerator from '../../helpers/idGenerator';
import { Container, Row, Col, InputGroup, FormControl, Button, Card } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash, faEdit } from '@fortawesome/free-solid-svg-icons';
import styles from './todo.module.css'

class ToDo extends React.Component {
    state = {
        inputValue: '',
        tasks: []
    };

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

        const newTask = {
            text: inputValue,
            _id: idGenerator()
        }

        const tasks = [newTask, ...this.state.tasks]
        this.setState({
            tasks:tasks,
            inputValue: ''
        })
    };

    removeTask =(taskId)=> {
        const newTasks = this.state.tasks.filter(task=> task._id !== taskId)
        this.setState({
            tasks: newTasks
        })
    }


    render() {
        const {tasks, inputValue} = this.state;
        const tasksArray = tasks.map((task)=>{
            return (
                <Col key={task._id} xs={12} sm={6} md={4} lg={3} xl={2}>
                <Card className={styles.task}>
                    <Card.Body>
                        <InputGroup.Prepend>
                            <InputGroup.Checkbox aria-label="Checkbox for following text input" />
                        </InputGroup.Prepend>
                        <Card.Title>{task.text.slice(0, 10)  + '...'}</Card.Title>
                        <Card.Text>{task.text}</Card.Text>
                        <Button variant="warning" className={styles.actionButton}>
                            <FontAwesomeIcon icon={faEdit}/>   
                        </Button>
                        <Button 
                        variant="danger" 
                        className={styles.actionButton}
                        onClick={()=>this.removeTask(task._id)}
                        >
                        <FontAwesomeIcon icon={faTrash}/>   
                        </Button>
                    </Card.Body>
                </Card>
            </Col>
            )
        });

        return (
            <div className={styles.todoWrapper}>
                <Container>
                    <Row className='justify-content-center'> 
                        <Col xs={12} sm={10} md={8} lg={6}>
                            <InputGroup className={styles.input}>
                                <FormControl
                                placeholder="Add New Task"
                                aria-label="Add New Task"
                                aria-describedby="basic-addon2"
                                onChange={this.handleInputChange}
                                onKeyDown={this.handleKeyDown}
                                value = {inputValue}
                                />
                                <InputGroup.Append>
                                <Button variant="info"
                                onClick={this.addTask}
                                disabled={!inputValue}
                                >Add
                                </Button>
                                </InputGroup.Append>
                            </InputGroup>
                        </Col>
                    </Row>

                    <Row>
                        {tasksArray}
                    </Row>
                </Container>

            </div>
        )
    };
};


export default ToDo;
