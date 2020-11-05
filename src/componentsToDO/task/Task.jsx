import React from 'react';
import { ListGroup } from 'react-bootstrap';

function Task(props) {
    return(
        <ListGroup.Item className='text-success'>{props.value}</ListGroup.Item>
    )
}

export default Task;