import React, { useState } from 'react'
import styles from './searchBox.module.css';
import Image from 'next/image';

interface SearchBoxProps {
  value: string;
  handleChange: (event: React.ChangeEvent<HTMLInputElement> ) => void;
  searchWord: (word: string) => Promise<void>
}

const SearchBox: React.FC<SearchBoxProps> = ({ value, handleChange, searchWord }) => {
  const [error, setError ] = useState(false)

const handleSearch = () => {
  if (value.trim() === ""){
    setError(true);
  } else {
    setError(false);
    searchWord(value);
  }
}

const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
  if (event.key === "Enter") {
    handleSearch();
  }
};

  return (
    <div className={styles.searchBoxContainer}>
    <input className={`${styles.searchBox} ${error ? styles.errorBorder : ""}`}type="text" placeholder='search for any word...' value={value} onChange={(e) => {handleChange(e); setError(false)}} onKeyDown={handleKeyDown}/>
    <div onClick={handleSearch}>
    <Image className={styles.magGlass} src='/frontend-mentor-dictionary-app/img/icon-search.svg' height={20} width={20} alt="search magifying glass"/>
    </div>
    {error && (<p className={styles.errorMessage}>whoops can`t be empty...</p> )}
    </div>
  )
}

export default SearchBox;