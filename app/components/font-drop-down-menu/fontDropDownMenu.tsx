"use client"

import React, { useState } from 'react'
import styles from './fontDropDown.module.css';
import Image from 'next/image';
import { useFont } from '../../context/FontContext';

import "../../globals.css";

const FontDropDownMenu: React.FC = () => {

const { setFont } = useFont();
const [ fontName, setFontHeader ] = useState('Sans Serif')

const handleFontChange = ( font: Font): void => {
  setFont(font.font_family);
  setFontHeader(font.title)
  setMenuState(false);
}

const [ isOpen, setMenuState ] = useState<boolean>(false);
interface Font {
  title: string;
  font_family: string;
  font_styled: string
}

const fonts: Font[] = [{title: "Sans Serif", font_family: 'font-inter-regular', font_styled: "Inter, sans-serif"}, {title: "Serif", font_family: 'font-lora-regular', font_styled: "Lora, serif" }, {title: "Mono", font_family: 'font-inconsolata-regular', font_styled: "Inconsolata, monospace"} ];

const changeMenuState = (): void => {
    setMenuState(!isOpen);
}

  return (
    <menu>
        <div className={styles.dropDownMenuContainer}>
            <div className={styles.selectFontHeaderContainer} onClick={() => changeMenuState()}>
                <div className={styles.selectedFont}><b>{fontName}</b></div>
                <Image className={styles.downArrowLogo} src='/frontend-mentor-dictionary-app/img/icon-arrow-down.svg' height={7} width={7} alt="down arrow"/>
                </div></div>
        <div className={styles.optionsMenu}>
            {isOpen ?
    <ul className={styles.dropDown}>{fonts.map((item, index) => {
       return <li className={styles.menuItem} style={{fontFamily: `${item.font_styled}`}} key={index} value={item.font_family} onClick={() =>handleFontChange(item)}>{item.title}
        </li>
    })}</ul>
     : null }
    </div>
    </menu>
  )
}

export default FontDropDownMenu