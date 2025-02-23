import styles from './correctResponse.module.css'
import React, { useState } from 'react';
import Image from 'next/image';

interface Props {
  word: string;
  phonetic?: string;
  phonetics: { text?: string; audio?: string }[];
  meanings: Meaning[];
  sourceUrls?: string[] | undefined;
}

interface Definition {
  definition: string;
  example?: string;
}

interface Meaning {
  partOfSpeech: string;
  definitions: Definition[];
  synonyms: string[]; 
}

const CorrectResponse: React.FC<Props> = ({ word, phonetic, phonetics, meanings, sourceUrls }) => {
  const [isHovered, setIsHovered] = useState(false);

  const playSound = (audioUrl: string) => {
    if (audioUrl) {
      const audio = new Audio(audioUrl);
      audio.play();
    }
  };

  const phoneticWithAudio = phonetics?.find(p => p.audio);

  const safeSourceUrls = sourceUrls ?? [];

  return (
    <div>
      <div className={styles.soundContainer}>
        <div>
          <h1>{word}</h1>
          <p className={styles.phoneticStylying}>{phonetic || phonetics?.[0]?.text || ''}</p>
        </div>

        {phoneticWithAudio && (
          <div
            className={styles.playbutton}
            onClick={() => playSound(phoneticWithAudio.audio!)}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
          >
            {isHovered ? (
              <svg xmlns="http://www.w3.org/2000/svg" width="75" height="75" viewBox="0 0 75 75">
                <g fill="#A445ED" fillRule="evenodd">
                  <circle cx="37.5" cy="37.5" r="37.5" opacity="1" />
                  <path d="M29 27v21l21-10.5z" fill="#FFFFFF" />
                </g>
              </svg>
            ) : (
              <svg xmlns="http://www.w3.org/2000/svg" width="75" height="75" viewBox="0 0 75 75">
                <g fill="#A445ED" fillRule="evenodd">
                  <circle cx="37.5" cy="37.5" r="37.5" opacity=".25" />
                  <path d="M29 27v21l21-10.5z" />
                </g>
              </svg>
            )}
          </div>
        )}
      </div>

      {meanings.map((meaning, i) => (
        <div key={i}>
          <div className={styles.nounContainer}>
            <h3><i>{meaning.partOfSpeech}</i></h3>
            <div className={styles.line}></div>
          </div>
          <h4 className={styles.meaningText}>Meaning</h4>
          {meaning.definitions.map((def, j) => (
            <ul key={j}>
              <li className={styles.definitionText}>
                {def.definition}
                {def.example && <p className={styles.defColour}>{`"${def.example}"`}</p>}
              </li>
            </ul>
          ))}
          {meaning.synonyms.length > 0 && (
            <div className={styles.synonymsContainer}>
              <p className={styles.synonymsText}>Synonyms</p>
              {meaning.synonyms.map((synonym, j) => (
                <React.Fragment key={j}>
                  <a
                    className={styles.synonymsStylying}
                    href={`https://en.wiktionary.org/wiki/${synonym}`}
                  >
                    {synonym}
                  </a>
                  {j < meaning.synonyms.length - 1 && <>&nbsp;</>}
                </React.Fragment>
              ))}
            </div>
          )}
        </div>
      ))}
     {safeSourceUrls?.length > 0 && (
  <div>
    <div className={styles.line} />
    <div className={styles.sourceContainer}>
      <p className={styles.sourceText}><u>Source:</u></p>
      <p>
        <a className={styles.sourceLink} href={safeSourceUrls[0]} target="_blank" rel="noopener noreferrer">
          {safeSourceUrls[0]}
        </a>
      </p>
      <div className={styles.externalLink} onClick={() => window.open(safeSourceUrls[0], "_blank")}>
        <Image className={styles.externalLink} src='/frontend-mentor-dictionary-app/img/external-link.svg' height={16} width={16} alt="external link" />
      </div>
    </div>
  </div>
)}
    </div>
  );
};

export default CorrectResponse;