import React, {useState} from 'react';
import { Navbar, Nav, NavDropdown, Form, FormControl, Button} from 'react-bootstrap';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { connect } from 'react-redux';
import {getTasks} from '../../store/actions';

const statusOptions = [
    {
        label: 'Active',
        value: 'active'
    },

    {
        label: 'Done',
        value: 'done'
    },

    {
        label: 'Reset',
        value: ''
    }
];

const sortOptions = [
    {
        label: 'A-Z',
        value: 'a-z'
    },

    {
        label: 'Z-A',
        value: 'z-a'
    },

    {
        label: 'Creation Date Oldest',
        value: 'creation_date_oldest'
    },

    {
        label: 'Creation Date Newest',
        value: 'creation_date_newest'
    },

    {
        label: 'Completion Date Oldest',
        value: 'completion_date_oldest'
    },

    {
        label: 'Completion Date Newest',
        value: 'completion_date_newest'
    },

    {
        label: 'Reset',
        value: ''
    }
];

const dateOptions = [
    {
        label: 'Create later than',
        value: 'create_lte'
    },

    {
        label: 'Create earlier than',
        value: 'create_gte'
    },

    {
        label: 'Complete later than',
        value: 'complete_lte'
    },

    {
        label: 'Complete earlier than',
        value: 'complete_gte'
    }
];

function Search(props){
    const [status, setStatus] = useState({
        label: '',
        value: ''
    });

    const [sort, setSort] = useState({
        label: '',
        value: ''
    });

    const [dates, setDates] = useState({
        create_lte: null,
        create_gte: null,
        complete_lte: null,
        complete_gte: null
    });

    const [search, setSearch] = useState('');

    const handleSubmit = ()=>{
        const data = {};
        const {create_lte, create_gte, complete_lte, complete_gte} = dates;
        if(create_lte) data.create_lte = create_lte.toLocaleDateString();
        if(create_gte) data.create_gte = create_gte.toLocaleDateString();
        if(complete_lte) data.complete_lte = complete_lte.toLocaleDateString();
        if(complete_gte) data.complete_gte = complete_gte.toLocaleDateString();
        if(search) data.search = search;
        if(sort) data.sort = sort.value;
        if(status) data.status = status.value;

        props.getTasks(data);
    };

    return(
        <div>
            <Navbar bg="light" expand="lg">
                <Navbar.Brand>Search/Sort/Filter</Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="mr-auto">
                    <NavDropdown title={status.value? status.label : 'Status'}>
                        {
                            statusOptions.map((item, index) =>{
                                return (
                                    <NavDropdown.Item
                                    key={index}
                                    onClick={()=>setStatus(item)}
                                    active={status.value === item.value}
                                    >
                                    {item.label}
                                    </NavDropdown.Item>
                                )
                            })
                        }
                    </NavDropdown>

                    <NavDropdown title={sort.value? sort.label : 'Sort'}>
                        {
                            sortOptions.map((item, index) =>{
                                return (
                                    <NavDropdown.Item
                                    key={index}
                                    onClick={()=>setSort(item)}
                                    active={sort.value === item.value}
                                    >
                                    {item.label}
                                    </NavDropdown.Item>
                                )
                            })
                        }
                    </NavDropdown>
                    </Nav>

                    <Form inline>
                    <FormControl 
                    type="text" 
                    placeholder="Search" 
                    className="mr-sm-2" 
                    value = {search}
                    onChange={(event)=>setSearch(event.target.value)}
                    />
                    <Button 
                    variant="outline-success"
                    onClick = {handleSubmit}
                    >
                    Search
                    </Button>
                    </Form>
                </Navbar.Collapse>
            </Navbar>

            <div> 
                {
                    dateOptions.map((item, index)=>{
                        return (
                            <div key = {index}>
                                <span>{item.label} </span>
                                <DatePicker
                                // className = {styles.date}
                                selected={dates[item.value]}
                                onChange={(date)=>{
                                    setDates({
                                        ...dates,
                                        [item.value]: date
                                    })
                                }} 
                                />
                            </div>
                        )
                    })
                }
            </div>
        </div>
    )
}


const mapDispatchToProps = {
    getTasks
};

export default connect(null, mapDispatchToProps)(Search);


