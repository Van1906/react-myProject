import React, { Component } from 'react';
import { Modal, FormControl, Button } from 'react-bootstrap';
import PropTypes from 'prop-types';

class EditModal extends Component {
  constructor(props){
    super(props);
    this.state = {
      ...props.data
    }
  }

  handleEdit = (event) => {
    this.setState({
        text: event.target.value,
    });
  }

  handleKeyDown = (event)=>{
    if(event.key === 'Enter') {
        this.handleSave();
    }
  }

  handleSave = ()=> {
    const {text} = this.state;
    if(!text) {
      return
    }

    this.props.onSave(this.state);
  }

  render(){
    const {text} = this.state;
    return (
      <Modal show={true} onHide={this.props.onClose} centered>
        <Modal.Header closeButton>
        <Modal.Title 
        className="text-warning"
        >
        Edit task ?
        </Modal.Title>
        </Modal.Header>
        <Modal.Body>
        <FormControl
        placeholder="Add New Task"
        aria-label="Add New Task"
        aria-describedby="basic-addon2"
        onChange={this.handleEdit}
        onKeyUp={this.handleKeyDown}
        value = {text}
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
  onSave: PropTypes.func.isRequired,
}

export default EditModal;