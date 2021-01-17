import React from 'react';
import styles from "./spinner.module.css";

export default function Spinner(props){
    return(
        <div className = {styles.spinnerApp}>
            <div className={styles.loader}>Loading...</div>
        </div>
    );
};