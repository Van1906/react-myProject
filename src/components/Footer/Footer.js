import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLinkedinIn, faGithub} from '@fortawesome/free-brands-svg-icons';
import { faHome, faAddressCard, faEnvelopeOpenText} from '@fortawesome/free-solid-svg-icons';
import { NavLink } from 'react-router-dom';


import styles from './footer.module.css';

export default function Footer(){
    return(
        <Container fluid className={`${styles.footerContainer} bg-secondary`}>
            <Row className={`${styles.footerRow} justify-content-center`}>
                <Col xs={12} sm={12} md={6}>
                    <ul className={styles.socialIconsUl}>
                        <li className={`${styles.socialIconsLi}`}>
                            <a href="https://www.linkedin.com/feed/" target="_blank">
                            <FontAwesomeIcon icon = {faLinkedinIn}/> 
                            </a>
                        
                        </li>

                        <li className={`${styles.socialIconsLi}`}>
                            <a href="https://github.com/Van1906/react-myProject" target="_blank">
                            <FontAwesomeIcon icon = {faGithub}/> 
                            </a>
                        </li>
                    </ul>
                
                </Col>
            </Row>

            <Row className={`${styles.footerRow} justify-content-center`}>
                <Col xs={12} sm={12} md={6}>
                    <div className={styles.footerNav}>
                    <NavLink 
                    to ='/' 
                    exact 
                    className={styles.footerNavLink}
                    >
                    <FontAwesomeIcon 
                    className={styles.footerNavIcon}
                    icon = {faHome}/>
                    Home 
                    </NavLink>

                    <NavLink 
                    to ='/about' 
                    exact 
                    className={styles.footerNavLink}
                    >
                    <FontAwesomeIcon 
                    className={styles.footerNavIcon}
                    icon = {faAddressCard}/>
                    About 
                    </NavLink>

                    <NavLink 
                    to ='/contact' 
                    exact 
                    className={styles.footerNavLink}
                    >
                    <FontAwesomeIcon 
                    className={styles.footerNavIcon}
                    icon = {faEnvelopeOpenText}/>
                    Contact 
                    </NavLink>
                    </div>
                </Col>
            </Row>

            <Row className={`${styles.footerRow} justify-content-center`}>
                <Col xs={12} sm={12} md={6}>
                    <div className={`${styles.copyRight} font-italic`}>
                        <span>CopyRight &#169; V.Kh 2020</span>
                        
                        <span>All rights reserved</span>
                    </div>
                </Col>
            </Row>
        </Container>
        
    );
}