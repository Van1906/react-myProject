import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFrownOpen } from '@fortawesome/free-solid-svg-icons';
import { NavLink } from 'react-router-dom';
import styles from './notFound.module.css'


export default function NotFound(){
    return(
        <div className={styles.wrapper}>
            <div className="text-center">
                <div className={styles.notFound}>
                    <h1 className={styles.oops}>Oops!</h1>
                    <div className = {`${styles.emoji} text-danger`}>
                    <FontAwesomeIcon icon = {faFrownOpen}/> 
                    </div>
                </div>

                <p className="text-secondary mb-0">Error 404</p>
                <p className="text-secondary mb-0">Sorry, but page not found!</p>
                <p className="text-secondary mb-0">
                Go beck to 
                <NavLink 
                to ='/' 
                exact 
                // activeClassName={styles.activePage}
                // className={styles.navLink}
                className={`${styles.goBack} text-danger mb-0`}
                >
                Home 
                </NavLink>
                 page, please.
                </p>


            </div>
        </div>
    );
}