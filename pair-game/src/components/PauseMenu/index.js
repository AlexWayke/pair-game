import styles from './PauseMenu.module.scss'

function PauseMenu() {
  return(
    <div className={styles.pause}>
      <div className={styles.pause_wrapper}>

        <ul className={styles.pause_actions}>
          <li className={styles.pause_sound + ' ' + styles.disabled}>
            <img src="./icons/music.png" alt="sound"/>
          </li>
          <li className={styles.pause_theme + ' ' + styles}>
            <img className={styles.active} src="./icons/sun-icon.svg" alt="sun"/>
            <img src="./icons/moon-icon.png" alt="moon"/>
          </li>
        </ul>
        <div className={styles.pause_btn}>
          to main menu
        </div>
      </div>
      <div className={styles.pause_bg}></div>
    </div>
  )
}

export default PauseMenu