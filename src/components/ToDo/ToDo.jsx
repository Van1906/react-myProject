import React, { PureComponent } from 'react';
import Task from '../Task/Task';
import AddTask from '../AddTask/AddTask';
import Confirm from '../Confirm';
import EditModal from '../EditModal';
import { Container, Row, Col, Button } from 'react-bootstrap';
import styles from './todo.module.css';

class ToDo extends PureComponent{
    state = {
        tasks: [],
        selectedTasks: new Set(),
        showConfirm: false,
        editTask: null
    };

    componentDidMount(){
        fetch("http://localhost:3001/task")
        .then((res)=> res.json())
        .then((response)=>{
            if(response.error) {
                throw response.error;
            }
            this.setState({
                tasks:response
            });
        })
        .catch((error)=>{
            console.log('error', error);
        });
    }

    addTask = (data) =>{
        const body = JSON.stringify(data);
        fetch("http://localhost:3001/task", {
            method: 'POST',
            headers: {
                "Content-Type": "application/json"
            },
            body
        })
        .then((res)=> res.json())
        .then((response)=>{
            if(response.error) {
                throw response.error;
            }
            const tasks = [response, ...this.state.tasks]
            this.setState({
                tasks:tasks
            });
        })
        .catch((error)=>{
            console.log('error', error);
        });
    };

    removeTask = (taskId)=> {
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
            const newTasks = this.state.tasks.filter(task => task._id !== taskId);
            this.setState({
                tasks: newTasks
            });
        })
        .catch((error)=>{
            console.log('error', error);
        });
    }

    handleCheck = (taskId)=> {
        const selectedTasks = new Set(this.state.selectedTasks);
        if(selectedTasks.has(taskId)){
            selectedTasks.delete(taskId);
        }
        else {
            selectedTasks.add(taskId);
        }
        this.setState({
            selectedTasks
        });
    }

    removeSelected = ()=> {
        const body = {
            tasks: [...this.state.selectedTasks]
        };
        fetch("http://localhost:3001/task", {
            method: 'PATCH',
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(body)
        })
        .then((res)=> res.json())
        .then((response)=>{
            if(response.error) {
                throw response.error;
            }
            let tasks = [...this.state.tasks];
            this.state.selectedTasks.forEach((id)=>{
                tasks = tasks.filter((task)=>task._id !== id)
            });
    
            this.setState({
                tasks,
                selectedTasks: new Set(),
                showConfirm: false
            });
        })
        .catch((error)=>{
            console.log('error', error);
        });
    }

    toggleConfirm = ()=> {
        this.setState({
            showConfirm: !this.state.showConfirm
        });
    }

    toggleEditModal = (task)=> {
        this.setState({
            editTask: task,
        });
    }

    saveEditTask = (editedTask) => {
        fetch(`http://localhost:3001/task/${editedTask._id}`, {
            method: 'PUT',
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(editedTask)
        })
        .then((res)=> res.json())
        .then((response)=>{
            if(response.error) {
                throw response.error;
            }
            const tasks = [...this.state.tasks];
            const taskIndex = tasks.findIndex((task)=>task._id === editedTask._id);
            tasks[taskIndex] = response;
    
            this.setState({
                tasks: tasks,
                editTask: null
            });
        })
        .catch((error)=>{
            console.log('error', error);
        });
    } 
    render() {
        console.log('ToDo render')
        const {tasks, selectedTasks, showConfirm, editTask} = this.state;
        const tasksArray = tasks.map((task)=>{
            return (
                <Col key={task._id} xs={12} sm={6} md={4} lg={3} xl={2}>
                    <Task 
                    data={task}
                    onRemove = {this.removeTask}
                    onCheck={this.handleCheck}
                    onEdit = {this.toggleEditModal}
                    disabled = {!!selectedTasks.size}
                    />
                </Col>
            )
        });

        return (
            <div className={styles.todoWrapper}>
                <Container>
                    <Row className='justify-content-center'> 
                        <Col xs={12} sm={10} md={8} lg={6}>
                           <AddTask 
                           onAdd = {this.addTask}
                           disabled = {!!selectedTasks.size}
                           />
                        </Col>
                    </Row>

                    <Row>
                        {tasksArray}
                    </Row>

                    
                    <Row className='justify-content-center'>
                        <Col xs={6} md={4} className='text-center'>
                            <Button
                            variant="outline-danger"
                            onClick={this.toggleConfirm}
                            disabled={!selectedTasks.size}
                            >Remove selected
                            </Button>
                        </Col>
                    </Row>

                </Container>

                {
                   showConfirm &&
                   <Confirm
                   onSubmit = {this.removeSelected} 
                   onClose = {this.toggleConfirm}
                   count = {selectedTasks.size} 
                   />
                }

                {
                    !!editTask &&
                    <EditModal
                    data = {editTask} 
                    onSave = {this.saveEditTask}
                    onClose = {()=>this.toggleEditModal(null)}
                    />
                }

            </div>
        )
    };
};


export default ToDo;
