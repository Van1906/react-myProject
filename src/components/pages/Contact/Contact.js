import React, { useState } from 'react';
import { Container, Row, Col, Form, Button } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEnvelopeOpenText} from '@fortawesome/free-solid-svg-icons';
import styles from './contact.module.css'


const defaultvalues = {
    name: '',
    email: '',
    phone: '',
    message: ''
};


 function Contact(){

    const [values, setvalues] = useState({
        defaultvalues
    });

    const handleChang = ({target: {name, value}})=>{
        setvalues({
            ...values,
            [name]: value

        })
    };

    const send = ()=>{
        console.log('values', values);
        setvalues(defaultvalues);
    }


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
                        <Form>
                            <Form.Group>
                                <Form.Control 
                                type="text" 
                                placeholder="Your name" 
                                value={values.name} 
                                onChange={handleChang}
                                name='name'
                                />
                            </Form.Group>

                            <Form.Group>
                                <Form.Control 
                                type="email" 
                                placeholder="Your email" 
                                value={values.email} 
                                onChange={handleChang}
                                name='email'
                                />
                            </Form.Group>

                            <Form.Group>
                                <Form.Control 
                                type="phone" 
                                placeholder="Your phone number" 
                                value={values.phone} 
                                onChange={handleChang}
                                name='phone'
                                />
                            </Form.Group>

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
                            onClick={send}
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
}

export default Contact;