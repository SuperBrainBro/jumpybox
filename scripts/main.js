import PlayScene from './playScene.js';
import WinScene from './winScene.js';
import MainMenu from './mainMenu.js';
import LevelSelect from './levelsSelect.js';
import WorkInProgress from './wip.js';
import CreditsScene from './credits.js';
import {SkinSelect} from './skins.js';

let config = {
  type: Phaser.AUTO,
  width: 800,
  height: 600,
  backgroundColor: 0xDDA0DD,
  pixelArt: true,
  scene: [
    MainMenu,
    LevelSelect,
    PlayScene,
    WinScene,
    SkinSelect,
    CreditsScene,
    WorkInProgress
  ],
  physics: {
    default: "arcade",
    arcade: {
    //debug: true,
      gravity: {
        y: 400,
      }
    }
  }
};

let game = new Phaser.Game(config);

export {game};
