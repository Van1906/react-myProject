import React, { useState, useRef, useEffect } from 'react';
import { Container, Row, Col, Form, Button } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEnvelopeOpenText} from '@fortawesome/free-solid-svg-icons';
import {connect} from 'react-redux';
import {send} from '../../../store/actions';
import styles from './contact.module.css'


const defaultvalues = {
    name: '',
    email: '',
    message: ''
};

 function Contact(){
    const nameRef = useRef(null);

    const [titleRequiredShown, setTitleRequiredShown] = useState(false);
    

    useEffect(()=>{
        nameRef.current.focus();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    

    const [values, setvalues] = useState({
        defaultvalues
    });

    const handleChang = ({target: {name, value}})=>{
        setvalues({
            ...values,
            [name]: value

        })
    };

    const handleSubmit = (e) => {
        console.log(e);
        e.preventDefault();
        const {email, massage} = values;
        if(!email || !massage) {
            setTitleRequiredShown(!titleRequiredShown);
            return;
        }
        console.log(values);
        
        send(values);
        
        setvalues(defaultvalues);
      };

    // const send = (name, email, message)=>{
    //     // e.preventDefault();
    //     // if(!name || !email || !message) {

    //     //     setTitleRequiredShown(!titleRequiredShown);

    //     //     this.titleRef.current.focus();
    //     //     return;
    //     // }

    //     const form = {
    //         name,
    //         email,
    //         message
    //     }

    //     send(form);

        
    // }



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
                                ref = {nameRef}
                                />
                            </Form.Group>

                            <div className={titleRequiredShown ? styles.showRequired : styles.hideRequired}>All fields are required!!!</div>
                            <Form.Group>
                                <Form.Control 
                                type="email" 
                                placeholder="Your email" 
                                value={values.email} 
                                onChange={handleChang}
                                name='email'
                                />
                            </Form.Group>

                            <div className={titleRequiredShown ? styles.showRequired : styles.hideRequired}>All fields are required!!!</div>
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
                            onClick={()=>handleSubmit}
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


const mapDispatchToProps = {
    send
};


export default connect(null, mapDispatchToProps)(Contact);
