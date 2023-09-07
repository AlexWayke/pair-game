import styles from './MainMenu.module.scss'

function MainMenu() {
  return(
    <div className={styles.menu}>
      <ul className={styles.menu_list}>
        <li className={styles.menu_item + ' ' + styles.disabled}>продолжить</li>
        <li className={styles.menu_item}>новая игра</li>
        <li className={styles.menu_item}>таблица лидеров</li>
        <li className={styles.menu_item}>настройки</li>
      </ul>
    </div>
  )
}

export default MainMenu