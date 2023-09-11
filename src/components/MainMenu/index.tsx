import styles from './MainMenu.module.scss'

import {Main} from '../../models'

export function MainMenu(props: Main) {
  const newGame = () => {
    props.startGame()
    localStorage.clear()
  }
  const isContinue = localStorage.length > 0 ? true : false;
  return(
    <div className={styles.menu}>
      <ul className={styles.menu_list}>
        {isContinue ? <li className={styles.menu_item} onClick={() => props.startGame()}>продолжить</li> : <li className={styles.menu_item + ' ' + styles.disabled}>продолжить</li>}
        <li className={styles.menu_item} onClick={() => {props.startGame(); newGame()}}>новая игра</li>
      </ul>
    </div>
  )
}