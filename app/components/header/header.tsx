import React from 'react'
import styles from "./header.module.css";
import Image from 'next/image';
import FontDropDownMenu from '../font-drop-down-menu/fontDropDownMenu';
import ToggleSwitch from '../toggle-switch/toggleSwitch';

interface HeaderProps {
  toggleTheme: () => void;
  resolvedTheme?: string;
}

const Header: React.FC<HeaderProps> = ({ toggleTheme, resolvedTheme }) => {
  return (
    <div className={styles.navigationContainer}>
        <div className={styles.logo} >
          <Image src='/frontend-mentor-dictionary-app/img/logo.svg' height={35} width={32} alt='dictionary logo'/></div>
        <div className={styles.dropDownMenu} >
          <FontDropDownMenu />
          </div>
        <div className={styles.lineBreak} />
        <div className={styles.toggleSwitch}><ToggleSwitch toggleTheme={toggleTheme} resolvedTheme={resolvedTheme}/></div>
        <div className={styles.moonLogo} >{resolvedTheme === "light" ? <Image src='/frontend-mentor-dictionary-app/img/icon-moon-light.svg' height={20} width={20} alt='light mode moon logo'/> : <Image src='/frontend-mentor-dictionary-app/img/icon-moon-dark.svg' height={20} width={20} alt='dark mode moon logo'/> }</div>
        </div>
  )
}

export default Header