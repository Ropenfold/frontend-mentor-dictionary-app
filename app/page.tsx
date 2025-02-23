'use client'

import styles from "./page.module.css";
import SearchBox from "./components/search-box/searchBox";
import StartState from "./components/start-state/startState";
import CorrectResponse from "./components/correct-response/correctResponse";
import { ErrorState } from "./components/error-state/errorState";
import { useEffect, useState } from "react";
import Header from "./components/header/header";
import WordNotFound from "./components/word-not-found/wordNotFound";
import { useTheme } from "next-themes";

type ApiResponse = {
  word: string;
  phonetics: { text?: string; audio?: string }[];
  meanings: {
    partOfSpeech: string;
    definitions: { definition: string; example?: string }[];
    synonyms: string[];
  }[];
  sourceUrls?: string[];
}[];

type ErrorResponse = {
  title: string;
  message: string;
  resolution: string;
};

export default function Home() {

  const [word, setWord] = useState('')
  const [data, setData] = useState<ApiResponse | ErrorResponse | null>(null);
  const [mounted, setMounted] = useState(false);
  const { resolvedTheme, setTheme } = useTheme();
  const [dataResponse, setDataResponse ] = useState<React.ReactNode>(<StartState />);


  useEffect(() => {
    
    console.log('data firing on change', data);
    if (data === null) {
      setDataResponse(<StartState />)
    } else if(Array.isArray(data)){
      setDataResponse(<CorrectResponse {...data[0]}/>)
    } else if(data && 'title' in data && data.title === "Network Error"){
      setDataResponse(<ErrorState {...data}/>)
    } else if (data && 'title' in data){
      setDataResponse(<WordNotFound />)
    }
    
  }, [data])

  useEffect(() => {
    setMounted(true);
  }, []);
  if (!mounted) {
    return null;
  }
  
  const toggleTheme = (): void => {
    setTheme(resolvedTheme === "light" ? "dark" : "light");
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setWord(event.target.value);
    console.log(word, 'word');  
  };

  const searchWord = async (word: string): Promise<void> => {
    

    const url = `https://api.dictionaryapi.dev/api/v2/entries/en/${word}`

    try {
      const response = await fetch(url);
      const data = await response.json();
      setData(data);
    } catch ( error) {
      if (error instanceof Error) { 
      if (error.message === "Failed to fetch" || !navigator.onLine) {
        setData({ title: "Network Error", message: "No internet connection", resolution: "Try searching again or contact support."  })
      } else {
        setData({ title: "Error", message: "Something went wrong. Please try again later", resolution: "Please refresh the page and try again." })
      }
    }
  }
  }

  return (
    <div className={styles.page}>
      <main className={styles.main}>
      <Header toggleTheme={toggleTheme} resolvedTheme={resolvedTheme}/>
        <SearchBox value={word} handleChange={handleChange} searchWord={searchWord}/>
        {dataResponse}
        </main>
    </div>
  );
}
