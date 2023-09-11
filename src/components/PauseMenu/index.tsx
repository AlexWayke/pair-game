import styles from './PauseMenu.module.scss'

import {Pause} from '../../models'

export function PauseMenu(props:Pause) {
  return(
    <div className={styles.pause}>
      <div className={styles.pause_wrapper}>
        <p className={styles.pause_title}>Pause</p>    
        <div className={styles.pause_btn}
        onClick={props.gotoMainMenu}
        >
          to main menu
        </div>
      </div>
      <div className={styles.pause_bg} onClick={() => {props.closeSettings(); props.play()}}></div>
    </div>
  )
}