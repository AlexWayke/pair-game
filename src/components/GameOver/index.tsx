import styles from './PauseMenu.module.scss'

import {Over} from '../../models'

export function GameOver(props:Over) {
  const clearStorage = () => {localStorage.clear()}
  return(
    <div className={styles.pause}>
      <div className={styles.pause_wrapper}>
        <p className={styles.pause_title}>Time: {props.time}<span> sec</span></p>  
        <p className={styles.pause_title}>Steps: {props.steps}</p>  
        <p className={styles.pause_title}>You win!</p>  
        <div className={styles.pause_btn}
        onClick={() => {props.gotoMainMenu(); clearStorage()}}
        >
          to main menu
        </div>
      </div>
      <div className={styles.pause_bg} onClick={() => {props.gotoMainMenu()}}></div>
    </div>
  )
}