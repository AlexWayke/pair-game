import styles from './GameField.module.scss';

const cards = [{img: "./img/ace_clubs.png"},{img: "./img/ace_clubs.png"},{img: "./img/ace_clubs.png"},{img: "./img/ace_clubs.png"},{img: "./img/ace_clubs.png"},{img: "./img/ace_clubs.png"},{img: "./img/ace_clubs.png"},{img: "./img/ace_clubs.png"},{img: "./img/ace_clubs.png"},{img: "./img/ace_clubs.png"},{img: "./img/ace_clubs.png"},{img: "./img/ace_clubs.png"}]

function GameField() {
  return(
    <div className={styles.field_wrapper}>
      <div className={styles.field_header}>
        <div className={styles.field_counter}>
          <label for="timer">timer:</label>
          <input name="timer" type="text" value="0" readonly/>
        </div>
        <div className={styles.field_counter}>
          <label for="score">score:</label>
          <input name="score" type="text" value="0" readonly/>
        </div>
        <div className={styles.field_settings}>
          <img src="./icons/gear-icon.svg" alt="gear" />
        </div>
      </div>
      <div className={styles.field_body}>
        {cards.map((card) => {
          return(<div className={styles.field_card}><img src={card.img} alt="ace"></img></div>)
        })}
      </div>
    </div>
  )
}

export default GameField