import React from 'react'
import styles from './toggleSwitch.module.css'

interface ToggleProps {
  toggleTheme: () => void;
  resolvedTheme: string | undefined;
}

const ToggleSwitch: React.FC<ToggleProps> = ({ toggleTheme, resolvedTheme }) => {
  return (
    <label className={styles.switch}>
  <input type="checkbox"
  checked={resolvedTheme === "dark"}
  onChange={toggleTheme}
  />
  <span className={styles.slider}></span>
</label>
  )
}

export default ToggleSwitch