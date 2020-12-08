import React from 'react';
import { Container, Row, Col, Form, Button } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEnvelopeOpenText} from '@fortawesome/free-solid-svg-icons';
import styles from './contact.module.css'

export default function Contact(){
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
                            <Form.Group controlId="formBasicEmail">
                                <Form.Control type="text" placeholder="Your name" />
                            </Form.Group>

                            <Form.Group controlId="formBasicEmail">
                                <Form.Control type="email" placeholder="Your email" />
                            </Form.Group>

                            <Form.Group controlId="exampleForm.ControlTextarea1">
                                <Form.Control as="textarea" placeholder="Message" />
                            </Form.Group>

                            <Button variant="info" type="submit" className={styles.buttonSend}>
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