import React, { useState, useRef, useEffect } from 'react';
import { Container, Row, Col, Form, Button } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEnvelopeOpenText} from '@fortawesome/free-solid-svg-icons';
import {connect} from 'react-redux';
import {send} from '../../../store/actions';
import styles from './contact.module.css';


const defaultvalues = {
    name: '',
    email: '',
    message: '',
    nameError: '',
    emailError: '',
    messageError: ''
};


 function Contact(props){
    const nameRef = useRef(null);

    const [nameRequiredShown, setNameRequiredShown] = useState(false);
    const [emailRequiredShown, setEmailRequiredShown] = useState(false);
    const [messageRequiredShown, setMessageRequiredShown] = useState(false);

    useEffect(()=>{
        nameRef.current.focus();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);


    const [values, setvalues] = useState({});

    const handleChang = ({target: {name, value}})=>{
        setvalues({
            ...values,
            [name]: value
        });
    };

    const validate = () =>{
        const regxEmail = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
        const {name, email, message} = values;
        let nameError = '';
        let emailError = '';
        let messageError ='';

        if(!name) {
            setNameRequiredShown(true);
            nameError = 'Fill the name field, please !!!';
        };
        

        if(!regxEmail.test(email)) {
            setEmailRequiredShown(true);
            emailError = 'Fill the valid email please !!!';
        };

        if(!message) {
            setMessageRequiredShown(true);
            messageError = 'Fill the message field, please !!!';
        };

        if(nameError || emailError || messageError) {
            setvalues({
                nameError,
                emailError,
                messageError
            });

            return false;
        };

        return true;
    };


    useEffect(()=>{
        if(props.sendFormSuccess) {
            setvalues(defaultvalues);
            nameRef.current.focus();
        }

    }, [props.sendFormSuccess]);

     const handleSubmit = (e) => {
        e.preventDefault();
        e.stopPropagation();
        const isValid = validate();
        if(isValid) {
            props.send(values);
        };
    };


    return(
        <>
        <Container className={styles.wrapper}>
            <Row className={styles.rowWrapper}>
                <Col sm={4} className={`${styles.message} ${styles.first}`}>
                    <div className={styles.massageBlock}>
                        <div className={`${styles.messageIcon} text-info`}>
                            <FontAwesomeIcon icon={faEnvelopeOpenText} /> 
                        </div>
                        <p className='text-center text-white'>If you have questions or just want to get in touch, fill in the form. We look forward to hearing from you!</p>
                    </div>
                </Col>

                <Col xs={12} sm={8} className={`${styles.message} ${styles.second}`}>
                    <div className={styles.formBlock}>
                        <h1 className='text-center'>Contact us</h1>
                        <div className={styles.formGroup}>
                            <Form onSubmit={handleSubmit}>
                                <div className={nameRequiredShown ? styles.showRequired : styles.hideRequired}>{values.nameError}</div>
                                <Form.Group>
                                    <Form.Control 
                                    type="text" 
                                    placeholder="Your name" 
                                    value={values.name} 
                                    onChange={handleChang}
                                    name='name'
                                    ref = {nameRef}
                                    />
                                </Form.Group>

                                <div className={emailRequiredShown ? styles.showRequired : styles.hideRequired}>{values.emailError}</div>      
                                <Form.Group>
                                    <Form.Control 
                                    type="email" 
                                    placeholder="Your email" 
                                    value={values.email} 
                                    onChange={handleChang}
                                    name='email'
                                    />
                                </Form.Group>

                                <div className={messageRequiredShown ? styles.showRequired : styles.hideRequired}>{values.messageError}</div>
                                <Form.Group>
                                    <Form.Control 
                                    as="textarea" 
                                    placeholder="Message"  
                                    value={values.message} 
                                    onChange={handleChang}
                                    name='message'
                                    />
                                </Form.Group>

                                <Button 
                                variant="info" 
                                type="submit" 
                                className={styles.buttonSend}
                                >
                                Send message
                                </Button>
                            </Form>
                        </div>
                    </div>
                </Col>
            </Row>
        </Container>
        </>

    );
};


const mapStateToProps = (state)=>{
    return {
        sendFormSuccess: state.sendFormSuccess

    }
}

const mapDispatchToProps = {
    send
};


export default connect(mapStateToProps, mapDispatchToProps)(Contact);
