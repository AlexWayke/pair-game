import styles from './GameField.module.scss';
import cards from './cards.js';
import React from 'react';
import PauseMenu from '../PauseMenu'
import GameOver from '../GameOver'


function GameField(props) {
  const newGame = () => {
    let combination = [];
    for(let i=0; i < props.difficult; i++) {
      combination.push(i);
    }
    combination = combination.concat(combination).sort( () => .5 - Math.random() );
    combination = combination.map((num) => {return {cardVal:num,cardState:false}})
    localStorage.setItem("currCombination", JSON.stringify(combination))
    localStorage.setItem("currSteps", JSON.stringify(0))
    localStorage.setItem("currTime", JSON.stringify(0))
    return combination
  }
  
  const parsedCombination = JSON.parse(localStorage.getItem('currCombination'));
  const parsedSteps = JSON.parse(localStorage.getItem('currSteps'));
  const parsedTime = JSON.parse(localStorage.getItem('currTime'));
  const order = parsedCombination !== null ? parsedCombination : newGame();
  
  const [gameOver, setGameOver] = React.useState(false);
  const [cardStates, setCardStates] = React.useState(order);
  const [isIterable, setIsIterable] = React.useState(true);
  let [timerValue, setTimerValue] = React.useState(parsedTime);
  let [stepsValue, setStepsValue] = React.useState(parsedSteps);
  const [timerPlay, setTimerPlay] = React.useState(true);
  const [settingsOpened, setSettingsOpened] = React.useState(false);
  
  const Win = () => {
    setGameOver(true)
    setTimerPlay(false)
    localStorage.clear()
  }
  
  const SaveTimer = () => {
    localStorage.setItem("currTime", JSON.stringify(timerValue))
  }
  
  const showCard = (event) => {
    if(isIterable) {
      const card = event.target.closest('[data-element="card"]');
      const cardIndex = card.getAttribute('data-index');
      setStepsValue(stepsValue + 1)
      
      order[cardIndex].cardState = true;
      localStorage.setItem("currCombination", JSON.stringify(order))
      localStorage.setItem("currSteps", JSON.stringify(stepsValue + 1))
      
      setCardStates(JSON.parse(localStorage.getItem('currCombination')))
    }
  }
  
  const checkPair = () => {
    if(isIterable) {
      const cardStates = JSON.parse(localStorage.getItem('currCombination'));
      const openedCards = cardStates.filter((card) => card.cardState)
      
      if(openedCards.length > 1) {
        setIsIterable(false);
        
        if(openedCards[0].cardVal === openedCards[1].cardVal) {
          const newCardStates = cardStates.filter((card) => {return card.cardVal !== openedCards[0].cardVal});
          console.log(newCardStates)
          
          if (newCardStates.length > 0){
            setTimeout(() => {
              setIsIterable(true);
              
              localStorage.setItem("currCombination", JSON.stringify(newCardStates))
              setCardStates(JSON.parse(localStorage.getItem('currCombination')));
            },1500)
          } else {
            Win()
          }
        } else {
          cardStates.forEach((card)=> {
            card.cardState = false
          })
          setTimeout(() => {
            setIsIterable(true);
            
            localStorage.setItem("currCombination", JSON.stringify(cardStates))
            setCardStates(JSON.parse(localStorage.getItem('currCombination')));
          },1500)
        }
      }
    }
  }

  if (timerPlay) {
    setTimeout(() => {
      setTimerValue(timerValue + 1)
      SaveTimer()
    },1000)
  }
  
  return(
    <div className={styles.field_wrapper}>
      <div className={styles.field_header}>
        <div className={styles.field_counter}>
          <label htmlFor="timer">timer:</label>
          <input name="timer" type="text" value={timerValue ? timerValue : 0} onChange={SaveTimer} readOnly/>
        </div>
        <div className={styles.field_counter}>
          <label htmlFor="steps">Steps:</label>
          <input name="steps" type="text" value={stepsValue ? stepsValue : 0} readOnly/>
        </div>
        <div className={styles.field_settings} onClick={() => {setSettingsOpened(true); setTimerPlay(false)}}>
          <img src="./icons/gear-icon.svg" alt="gear"/>
        </div>
      </div>
      <div data-element="wrapper" className={styles.field_body} onClick={checkPair}>
        {cardStates.map((card, index) => {
          return(
            <div key={index} data-value={card.cardVal} data-element="card" data-index={index} className={styles.card} onClick={showCard}>
              {card.cardState && <img className={styles.card__face} src={cards[card.cardVal].img} alt="card"></img>}
              <img className={styles.card__shirt} src='./img/shirt.png' alt="shirt"></img>
            </div>
            )
        })}
      </div>
      {settingsOpened && <PauseMenu 
        closeSettings={() => setSettingsOpened(false)}
        gotoMainMenu={props.gotoMainMenu}
        play={setTimerPlay}
      />}
      {gameOver && <GameOver
        gotoMainMenu={props.gotoMainMenu}
        steps={stepsValue}
        time={timerValue}
      />}
    </div>
  )
}

export default GameField