import styles from './MainMenu.module.scss'


function MainMenu(props) {
  const newGame = () => {
    localStorage.clear()
  }
  const isContinue = localStorage.length > 0 ? true : false;
  return(
    <div className={styles.menu}>
      <ul className={styles.menu_list}>
        {isContinue ? <li className={styles.menu_item} onClick={props.startGame}>продолжить</li> : <li className={styles.menu_item + ' ' + styles.disabled}>продолжить</li>}
        <li className={styles.menu_item} onClick={() => {props.startGame(); newGame()}}>новая игра</li>
        {/* <li className={styles.menu_item}>таблица лидеров</li> */}
      </ul>
    </div>
  )
}

export default MainMenu