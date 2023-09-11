export interface Main {
  closeMainMenu: ()=>void
  startGame: ()=>void
  difficult: number
}

export interface Card {
  cardVal: number
  cardState: boolean
  opened: boolean
}

export interface CardBack {
  id: number
  img: string
}

export interface Field {
  difficult: number
  gotoMainMenu: ()=>void
}

export interface Pause {
  closeSettings: ()=> void
  gotoMainMenu: ()=> void
  play: ()=> void
}

export interface Over {
  gotoMainMenu: ()=>void
  steps: number
  time: number
}

