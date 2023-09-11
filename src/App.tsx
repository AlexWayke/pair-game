import {useState} from 'react';
import {MainMenu} from './components/MainMenu'
import {GameField} from './components/GameField'

export function App() {
  const [gameField, setGameField] = useState(false);
  const [mainMenu, setMainMenu] = useState(true);

  return (
    <span>
      {gameField && <GameField
      difficult = {18}
      gotoMainMenu={() => {
        setGameField(false)
        setMainMenu(true)
      }}
    />}
      {mainMenu && <MainMenu
      closeMainMenu={() => setMainMenu(false)}
      startGame={() => {
        setMainMenu(false)
        setGameField(true)
      }}
      difficult = {2}
      />}
    </span>
  );
}


