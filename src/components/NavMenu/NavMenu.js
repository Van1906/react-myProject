import React from 'react';
import { Navbar, Nav } from 'react-bootstrap';
import { NavLink } from 'react-router-dom';
import styles from './navMenu.module.css';
export default function NavMenu(){
    return(
        <Navbar expand="lg" className={`${styles.navBar} sticky-top`}>
        <Navbar.Toggle aria-controls="basic-navbar-nav"/>
        <Navbar.Collapse id="basic-navbar-nav" className={'justify-content-center'}>
          <Nav className={styles.navCollapse}>
            <NavLink 
            to ='/' 
            exact 
            activeClassName={styles.activePage}
            className={styles.navLink}
            >
            Home
            </NavLink>
            <NavLink 
            to ='/about' 
            exact 
            activeClassName={styles.activePage}
            className={styles.navLink}
            >
            About
            </NavLink>
            <NavLink 
            to ='/contact' 
            exact 
            activeClassName={styles.activePage}
            className={styles.navLink}
            >
            Contact
            </NavLink>
          </Nav>
        </Navbar.Collapse>
      </Navbar>
    );
};