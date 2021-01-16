import React, { PureComponent } from 'react';
import Task from '../../Task/Task';
import AddTask from '../../AddTask/AddTask';
import Confirm from '../../Confirm';
import EditModal from '../../EditModal/EditModal';
import Search from '../../Search/Search';
import { Container, Row, Col, Button } from 'react-bootstrap';
import styles from './todo.module.css';
import { connect } from 'react-redux';
import {getTasks, saveEditTask, removeSelected} from '../../../store/actions';



class ToDo extends PureComponent{
    state = {
        selectedTasks: new Set(),
        showConfirm: false,
        editTask: null,
        openNewTaskModal: false
    };

    componentDidMount(){
        this.props.getTasks();
    }

    componentDidUpdate(prevProps){
        if(!prevProps.addTaskSuccess && this.props.addTaskSuccess){
            this.toggleNewTaskModal();
        }

        if(!prevProps.removeTasksSuccess && this.props.removeTasksSuccess){
            this.setState({
                selectedTasks: new Set(),
                showConfirm: false
            });
        }

        if(!prevProps.editTaskSuccess && this.props.editTaskSuccess){
            this.setState({
                editTask: null
            });
        }
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
        const taskIds = [...this.state.selectedTasks];
        this.props.removeSelected(taskIds);
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

    toggleNewTaskModal = ()=> {
        this.setState({
            openNewTaskModal: !this.state.openNewTaskModal
        })
    }

    render() {
        const { selectedTasks, showConfirm, editTask, openNewTaskModal} = this.state;

        const tasksArray = this.props.tasks.map((task, index)=>{
            return (
                <Col key={task._id} xs={12} sm={6} md={4} lg={3}>
                    <Task 
                    data={task}
                    onCheck={this.handleCheck}
                    onEdit = {this.toggleEditModal}
                    disabled = {!!selectedTasks.size}

                    />
                </Col>
            )
        });

        return (
            <>
                <Container>
                    <Search />
                    <Row className='justify-content-center text-center'> 
                        <Col xs={12} sm={10} md={8} lg={6}>
                            <Button 
                            variant="info"
                            onClick={this.toggleNewTaskModal}
                            disabled={!!selectedTasks.size}
                            >Add New Task
                            </Button>
                        </Col>
                    </Row>

                    <Row className='justify-content-right'>
                        <Col xs={12} className='text-right'>
                            <Button
                            className = {styles.removeButton}
                            variant="outline-danger"
                            onClick={this.toggleConfirm}
                            disabled={!selectedTasks.size}
                            >Remove selected
                            </Button>
                        </Col>
                    </Row>

                    <Row>
                        {tasksArray}
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
                    from = 'tasks'
                    onClose = {()=>this.toggleEditModal(null)}
                    />
                }

                {
                    openNewTaskModal &&
                    <AddTask 
                    onClose = {this.toggleNewTaskModal}
                    />
                }
            </>
        )
        
    };
};

const mapStateToProps = (state)=>{
    return {
        tasks: state.tasks,
        addTaskSuccess: state.addTaskSuccess,
        removeTasksSuccess: state.removeTasksSuccess,
        editTaskSuccess:state.editTaskSuccess
    }
}


const mapDispatchToProps = {
    getTasks,
    saveEditTask,
    removeSelected
};

export default connect(mapStateToProps, mapDispatchToProps)(ToDo);
