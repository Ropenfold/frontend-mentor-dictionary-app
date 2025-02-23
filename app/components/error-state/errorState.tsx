import styles from '../word-not-found/wordNotFound.module.css'
import React from 'react'

interface Props {
  title: string;
  message: string;
}

export const ErrorState = (props: Props) => {

  return (
      <div className={styles.mainContainer}>
        <p className={styles.emoji}>&#128732;</p>
        <p className={styles.header}>{props.title}</p>
        <p className={styles.errorMessage}>{`${props.message}. Please check your connection and try again or try again later`}</p>
        </div>
    )
}
