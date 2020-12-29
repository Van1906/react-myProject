import React, { Component, createRef } from 'react';
import { Modal, FormControl, Button } from 'react-bootstrap';
import PropTypes from 'prop-types';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import styles from './editModal.module.css';
import { dateFormat } from '../../helpers/utils';
import { connect } from 'react-redux';
import {saveEditTask} from '../../store/actions';

class EditModal extends Component {
  constructor(props){
    super(props);
    const {date}= props.data;
    this.state = {
      ...props.data,
      date: date ? new Date(props.data.date): new Date()
    }
    this.titleRef = createRef(null);
  };

  componentDidMount(){
    this.titleRef.current.focus();
  }

  handleEdit = (event)=>{
    const {name, value} = event.target;
    this.setState({
        [name]: value,
    });
  };

  handleKeyUp = (event)=>{
    if(event.key === 'Enter') {
        this.handleSave();
    }
  };

  handleSave = ()=> {
    const {title, date} = this.state;
    if(!title) {
      return
    }

    const editedTask = {
      ...this.state,
      date: dateFormat(date.toISOString())
    }

    this.props.saveEditTask(editedTask, this.props.from);
  };

  handleDateChange = (date) =>{
    this.setState({
        date
    });
  };

  render(){
    const {title, description, date} = this.state;
    return (
      <Modal 
      show={true} 
      onHide={this.props.onClose} 
      centered
      >
        <Modal.Header closeButton>
        <Modal.Title 
        className="text-warning"
        >
        Are you sure to edit task?
        </Modal.Title>
        </Modal.Header>
        <Modal.Body>
        <FormControl
        name = 'title'
        value = {title}
        onChange={this.handleEdit}
        onKeyUp={this.handleKeyUp}
        ref = {this.titleRef}
        className={styles.focused}
        />
        <FormControl 
        as="textarea" 
        name = 'description'
        value = {description}
        className={`${styles.textArea} ${styles.focused}`}
        placeholder = 'Description'
        onChange={this.handleEdit} 
        />
        <DatePicker
        className = {`${styles.date} ${styles.focused}`}
        selected={date} 
        minDate={new Date()}
        onChange={this.handleDateChange} 
        />
        </Modal.Body>
        <Modal.Footer>
        <Button 
        variant="warning" 
        onClick={this.handleSave}
        >
        Save changes
        </Button>
        <Button 
        variant="secondary" 
        onClick={this.props.onClose}
        >
        Close
        </Button>
        </Modal.Footer>
      </Modal>
    );
  }

};

EditModal.propTypes = {
  data: PropTypes.object.isRequired,
  onClose: PropTypes.func.isRequired,
}

const mapDispatchToProps = {
  saveEditTask
}

export default connect(null, mapDispatchToProps)(EditModal);