import React from 'react';
import MainMenu from './components/MainMenu/'
import GameField from './components/GameField/'

function App() {
  const [gameField, setGameField] = React.useState(false);
  const [mainMenu, setMainMenu] = React.useState(true);

  return (
    <div className="App">
      {gameField && < GameField 
        difficult = {2}
        gotoMainMenu={() => {
          setGameField(false)
          setMainMenu(true)
        }}
      />}
      {mainMenu && <MainMenu 
        closeMainMenu={() => setMainMenu(false)}
        startGame={() => {
          setGameField(true)
          setMainMenu(false)
        }}
        difficult = {2}
      />}
    </div>
  );
}

export default App;
