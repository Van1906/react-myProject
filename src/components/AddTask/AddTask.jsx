import React, { Component } from 'react';
import { FormControl, Button, Modal } from 'react-bootstrap';
import styles from './addTask.module.css';
import PropTypes from 'prop-types';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { dateFormat } from '../../helpers/utils';
import {connect} from 'react-redux';
import {addTask} from '../../store/actions';


class Addtask extends Component {
    constructor(props){
        super(props);

        this.state = {
            title : '',
            description: '',
            date: new Date(),
            titleRequiredShown: false
        }

        this.titleRef = React.createRef(null)
    }

    componentDidMount(){
        this.titleRef.current.focus();
      }


    handleChange = (event)=>{
        const {name, value} = event.target;
        this.setState({
            [name]: value,
        });
    };

    handleKeyDown = (event)=>{
        if(event.key === 'Enter') {
            this.addTask();
        }
    }

    addTask = () =>{
        const {title, description, date} = this.state;
        if(!title) {
            this.setState({
                titleRequiredShown: true
            });
            this.titleRef.current.focus();
            return;
        }

        const task = {
            title,
            description,
            date: dateFormat(date.toISOString())
        }

        this.props.addTask(task);

    };

    handleDateChange = (date) =>{
        this.setState({
            date
        });
    };

    render() {
        const {onClose} = this.props;
        const {titleRequiredShown} = this.state;
        return(
            <Modal 
            show={true} 
            onHide={onClose} 
            centered
            >
                <Modal.Header closeButton>
                <Modal.Title 
                className="text-info"
                >
                Add New Task
                </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div className={titleRequiredShown ? styles.showRequired : styles.hideRequired}>Title is required!!!</div>
                    <FormControl
                    placeholder="Title"
                    name = 'title'
                    onChange={this.handleChange}
                    onKeyDown={this.handleKeyDown}
                    ref = {this.titleRef}
                    required = {true}
                    />
                    <FormControl 
                    as="textarea" 
                    name = 'description'
                    className={styles.textArea}
                    placeholder = 'Description'
                    onChange={this.handleChange} 
                    />
                    <DatePicker
                    className = {styles.date}
                    selected={this.state.date}
                    minDate={new Date()}
                    onChange={this.handleDateChange} 
                    />
                </Modal.Body>
                <Modal.Footer>
                <Button 
                variant="info" 
                onClick={this.addTask}
                >
                Add
                </Button>
                <Button 
                variant="secondary" 
                onClick={onClose}
                >
                Cancel
                </Button>
                </Modal.Footer>
            </Modal>
        )
    }
};

Addtask.propTypes = {
    onClose: PropTypes.func.isRequired
}

const mapDispatchToProps = {
    addTask
};

export default connect(null, mapDispatchToProps)(Addtask);

