import styles from './PauseMenu.module.scss'

function PauseMenu(props) {
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
      <div className={styles.pause_bg} onClick={() => {props.closeSettings(); props.play(true)}}></div>
    </div>
  )
}

export default PauseMenu