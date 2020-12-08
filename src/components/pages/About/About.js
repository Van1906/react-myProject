import React from 'react';
import { Container, Row, Col, ListGroup } from 'react-bootstrap';
import styles from './about.module.css';
export default function About(){
    return(
        <>
        <Container>
            <Row>
                <Col className={styles.colStyle}>
                    <div className={`${styles.titleBlock} text-center `}>
                        <h1 className={styles.aboutTitle}>React.js project created with create-react-app</h1>
                        <h5 className={`text-info`}>The Project is <span className='text-danger'>ToDo List</span>, which is very easy in use. It allows you to <span className='font-italic'>add, edit, delete, sort</span> tasks and save them in data base.</h5>
                        <h5 className='text-info'>We hope, you will like it and it will make your tasks organizing more comfortable.</h5>
                    </div>
                    <div className='text-secondary'>
                        <ListGroup variant="flush" className={styles.aboutInfo}>
                            <ListGroup.Item><h5 className='text-center'>The project's structure and some general functionality:</h5></ListGroup.Item>
                            <ListGroup.Item>1. Besides React.js basic node modules, for more opportunities installed and used: 
                                <li>react-bootstrap</li> 
                                <li>react fontawesome</li> 
                                <li>react-router</li> 
                                <li>prop-types</li> 
                                <li>react-datepicker</li>
                            </ListGroup.Item>
                            <ListGroup.Item>2. We have a general <span className='font-italic text-dark'>ToDo</span> component, where mostly import other components, like as <span className='font-italic text-dark'>Task, Addtask, Confirm, EditModal</span></ListGroup.Item>
                            <ListGroup.Item>3. <span className='font-italic text-dark'>Navigation bar</span> to switch pages - home, about, contact, 404.</ListGroup.Item>
                            <ListGroup.Item>4. On home page there is a <span className='font-italic text-dark'>Add New Task</span> button for opening modal.
                                <li><span className='font-italic text-dark'>toggleNewTaskModal</span> function in ToDo component will open and close modal.</li>
                                <li>In modal you can write new tasks title(is required), description, created time and save it clicking Add button.</li>
                                <li><span className='font-italic text-dark'>addTask</span> function in ToDo component will save new task.</li>
                            </ListGroup.Item>
                            <ListGroup.Item>5. On home page are showing all saved tasks, which are now in data base.</ListGroup.Item>
                            <ListGroup.Item>6. Each task has <span className='font-italic text-dark'>Edit</span> and <span className='font-italic text-dark'>Delete</span> buttons.</ListGroup.Item>
                            <ListGroup.Item>7. <span className='font-italic text-dark'>Edit</span> button for opening edit modal. 
                                <li><span className='font-italic text-dark'>toggleEditModal</span> function in ToDo component will open and close modal.</li>
                                <li>In modal you can edit tasks fields- titles, description, created time and save it clicking Save changes button.</li>
                                <li><span className='font-italic text-dark'>saveEditTask</span> function in ToDo component will save edited task.</li>
                            </ListGroup.Item>
                            <ListGroup.Item>8. <span className='font-italic text-dark'>Delete</span> button for deleting one task.
                                <li><span className='font-italic text-dark'>removeTask</span> function in ToDo component will delete a task.</li>
                            </ListGroup.Item>
                            <ListGroup.Item>9. Each task has a <span className='font-italic text-dark'>checkbox</span> for select some tasks and delete them with Remove selected button.</ListGroup.Item>
                            <ListGroup.Item>10. <span className='font-italic text-dark'>Remove selected</span> button for opening modal.
                                <li><span className='font-italic text-dark'>toggleConfirm</span> function in ToDo component will open and close modal.</li>
                                <li>It asks are you sure to delete all selected tasks.</li>
                                <li><span className='font-italic text-dark'>removeSelected</span> function in ToDo component will delete selected tasks.</li>
                            </ListGroup.Item>
                            <ListGroup.Item>11. Task's title is a link. 
                                <li>It switch to <span className='font-italic text-dark'>single task</span> page, where you can see the full task.</li> 
                                <li>There also has <span className='font-italic text-dark'>Edit</span> and <span className='font-italic text-dark'>Delete buttons.</span></li>
                            </ListGroup.Item>
                            <ListGroup.Item>12. On about page, you can read information about the project and how to use it.</ListGroup.Item>
                            <ListGroup.Item>13. If you write wrong path, you will be redirect to 404, but dont worry, you always can go back with browser's navigation arrows or Home page.</ListGroup.Item>
                            <ListGroup.Item>14. On contact page you can contact as. You must fill in the form. We will be happy to answer you questions, good luck!</ListGroup.Item>
                        </ListGroup>
                    </div>
                </Col>
            </Row>
        </Container>
        </>
    )
}