import React from 'react';
import { Modal, Button } from 'react-bootstrap';
import PropTypes from 'prop-types';


function Confirm(props) {
    return (
        <Modal show={true} onHide={props.onClose} centered>
          <Modal.Header closeButton>
            <Modal.Title 
            className="text-danger">
            Are you sure to delete {props.count} {props.count > 1 ? 'tasks' : 'task'} ?
            </Modal.Title>
          </Modal.Header>
          <Modal.Footer>
            <Button 
            variant="danger" 
            onClick={props.onSubmit}
            >
            Delete
            </Button>
            <Button 
            variant="secondary" 
            onClick={props.onClose}
            >
            Close
            </Button>
          </Modal.Footer>
      </Modal>
    );
};

Confirm.propTypes = {
  onSubmit: PropTypes.func.isRequired,
  onClose: PropTypes.func.isRequired,
  count: PropTypes.number.isRequired,
}

export default Confirm;