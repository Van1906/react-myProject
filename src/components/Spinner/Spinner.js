import React from 'react';
import styles from "./spinner.module.css"
export default function Spinner(){
    return(
        <div className = {styles.spinnerContainer}>
            <div className={styles.loader}>Loading...</div>
        </div>

    )
}