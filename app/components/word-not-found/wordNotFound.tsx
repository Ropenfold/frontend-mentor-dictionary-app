import React from 'react'
import styles from './wordNotFound.module.css'

const WordNotFound = () => {
  return (
    <div className={styles.mainContainer}>
      <p className={styles.emoji}>&#128533;</p>
      <p className={styles.header}>No Definitions Found</p>
      <p className={styles.errorMessage}>Sorry pal, we couldn&apos;t find definitions for the word you were looking for. You can try the search again at later time or head to the web instead.</p>
      </div>
  )
}

export default WordNotFound