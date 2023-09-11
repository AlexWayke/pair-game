import styles from './GameField.module.scss';
import {cards} from '../../data/cards';
import React from 'react';
import {PauseMenu} from '../PauseMenu'
import {GameOver} from '../GameOver'

import {Card} from '../../models'
import {Field} from '../../models'

export function GameField (props:Field) {
  const newGame = () => {
    let combination:Card[] = [];
    for(let i=0; i < props.difficult; i++) {
      combination.push({cardVal: i,cardState:false,opened:false});
    }
    combination = combination.concat(combination).sort( () => .5 - Math.random() );

    localStorage.setItem("currCombination", JSON.stringify(combination))
    localStorage.setItem("currSteps", JSON.stringify(0))
    localStorage.setItem("currTime", JSON.stringify(0))
    return combination
  }

  const steps:(string|null) = localStorage.getItem('currSteps')
  const parsedSteps:number = steps !== null ? JSON.parse(steps) : 0;
  const time:(string|null) = localStorage.getItem('currTime');
  const parsedTime:number = time ? JSON.parse(time) : 0;
  const combination = localStorage.getItem('currCombination');
  const parsedCombination:Card[] = combination !== null ? JSON.parse(combination) : newGame();
  
  const [gameOver, setGameOver] = React.useState(false);
  const [cardStates, setCardStates] = React.useState(parsedCombination);
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
  
  const showCard = (event:any) => {
    if(isIterable && event.target!== null) {
      const card = event.target.closest('[data-element="card"]');
      const cardIndex:(number|null) = card !== null ? Number(card.getAttribute('data-index')) : null;
      setStepsValue(stepsValue + 1)
      
      if (cardIndex !== null) {
        parsedCombination[cardIndex].cardState = true;
        localStorage.setItem("currCombination", JSON.stringify(parsedCombination))
        localStorage.setItem("currSteps", JSON.stringify(stepsValue + 1))
      }
      
      const combination = localStorage.getItem('currCombination');
      setCardStates(combination !== null ? JSON.parse(combination): '');
    }
  }
  
  const checkPair = () => {
    if(isIterable) {
      const states = localStorage.getItem('currCombination')
      const cardStates = states !== null ? JSON.parse(states) : '';
      let openedCards = cardStates.filter((card:Card) => card.cardState)
      
      if(openedCards.length > 1) {
        setIsIterable(false);
        
        if(openedCards[0].cardVal === openedCards[1].cardVal) {
          cardStates.forEach((card:Card) => {
            if(card.cardVal === openedCards[1].cardVal){
                card.opened = true;
            }
          })
          openedCards = [];
          
          let counter:number = 0;
          cardStates.forEach((card:Card) =>{if(!card.opened){counter++}})
          if (counter > 0){
            setTimeout(() => {
              setIsIterable(true);
              cardStates.forEach((card:Card) => {card.cardState = false})
              
              localStorage.setItem("currCombination", JSON.stringify(cardStates))
              const combination = localStorage.getItem('currCombination');
              setCardStates(combination !== null ? JSON.parse(combination): '');
            },1500)
          } else {
            Win()
          }
        } else {
          cardStates.forEach((card:Card)=> {
            card.cardState = false
          })
          setTimeout(() => {
            setIsIterable(true);
            
            localStorage.setItem("currCombination", JSON.stringify(cardStates))
            const combination = localStorage.getItem('currCombination');
            setCardStates(combination !== null ? JSON.parse(combination): '');
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
        {cardStates.map((card: Card, index: number) => {
          return(
            <div key={index} data-value={card.cardVal} data-element="card" data-index={index} className={styles.card}>
              {!card.opened && <span>
                {card.cardState && <img className={styles.card__face} src={cards[card.cardVal].img} alt="card"></img>}
                <img className={styles.card__shirt} src='./img/shirt.png' alt="shirt" onClick={showCard}></img>
              </span>}
              {card.opened && <img className={styles.card__shirt} src='./img/empty.png' alt="shirt"></img>}
            </div>
            )
        })}
      </div>
      {settingsOpened && <PauseMenu 
        closeSettings={() => setSettingsOpened(false)}
        gotoMainMenu={props.gotoMainMenu}
        play={() => setTimerPlay(true)}
      />}
      {gameOver && <GameOver
        gotoMainMenu={props.gotoMainMenu}
        steps={stepsValue}
        time={timerValue}
      />}
    </div>
  )
}