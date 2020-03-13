let gameState = {};
let time = 0;

import Player from './player.js';
import {game} from './main.js';
import {SkinSelect} from './skins.js';

export default class PlayScene extends Phaser.Scene {
  constructor () {
    super('PlayScene');
  }
  
  init(config) {
    this.levelData = config.level;
    this.level = config.levelNum;
    console.debug(localStorage.getItem('skin'));
  }
  
  preload() {
    let skin = localStorage.getItem('skin');
    if (skin == 'undefined' || skin === null) {
      skin = 'assets/player.png';
    }
    this.load.image('player', skin);
    this.load.image('platform', 'assets/platform.png');
    this.load.image('platform2', 'assets/platform2.png');
    this.load.image('portal', 'assets/portal.png');
    this.load.image('spike', 'assets/spike.png');
    this.load.image('trampoline', 'assets/trampoline.png');
    this.load.audio('jump', 'assets/sounds/jump.wav');
  }
  
  create() {
    
    this.input.mouse.disableContextMenu();
    gameState.jumpSound = this.sound.add('jump');
    
    gameState.cursors = this.input.keyboard.createCursorKeys();
    this.timer();
    
    let playerOptions = {
      scene: this,
      x: 64,
      y: 400,
      jumpForce: 320,
      key: 'player',
      input: gameState.cursors
    };
    
    gameState.player = new Player(playerOptions);
    gameState.player.setBounce(0.2);
    
    
    this.generateLevel();
    
    //gameState.time = this.add.text(40, 40, time, {
    //  color: '#000000',
    //  fontSize: 32
    //});
    
    this.input.on('pointerdown', function() {
      gameState.player.jump(); //jump on click
    });
  }
  
  update() {
    let platforms = gameState.platforms.children.entries;
    for (let i = 0; i < platforms.length; i++) {
      if (platforms[i].body.x < -16 && platforms[i].x < -16) {
        platforms[i].destroy();
      }
    }
    
    if (!(gameState.txt === null || gameState.txt === undefined)) {
      gameState.txt.x = gameState.txtSprite.x;
      gameState.txt.y = gameState.txtSprite.y;
    }
  
    if (gameState.player.update() == 'isDead') { //check if player fell off screen
      time = 0;
      this.scene.restart();
    }
  
    //gameState.time.setText(time); //update timer
  }
  
  timer() {
    this.scene.systems.time.delayedCall(1000, function() {
      time++;
      this.timer();
    }, [], this);
  }
  
  generateLevel () {
    gameState.platforms = this.physics.add.group();
    gameState.fakePlatforms = this.physics.add.group();
    gameState.spikes = this.physics.add.group();
    gameState.portals = this.physics.add.group();
    gameState.trampolines = this.physics.add.group();
    
    let speed = 160;
    
    for (let y = 0; y < this.levelData.length; y++) {
      for (let x = 0; x < this.levelData[y].length; x++) {
        if (typeof(this.levelData[y][x]) == 'number') {
          switch(this.levelData[y][x]) {
            case 0:
              break;
            case 1:
              gameState.platforms.create(x * 32, y * 32, 'platform');
              break;
            case 2:
              gameState.spikes.create(x * 32, y * 32, 'spike');
              break;
            case 3:
              gameState.portals.create(x*32, y*32, 'portal');
              break;
            case 4:
              gameState.trampolines.create(x*32, y*32, 'trampoline');
              break;
            case 5:
              gameState.fakePlatforms.create(x * 32, y * 32, 'platform');
              break;
            default:
              console.error("Invalid level data!");
              debugger;
          }
        }
      }
    }
    
    let platforms = gameState.platforms.children.entries;
    for (let i = 0; i < platforms.length; i++) {
      platforms[i].body.allowGravity = false;
      platforms[i].body.immovable = true;
      platforms[i].body.setVelocityX(-speed);
      platforms[i].setDebugBodyColor(0x0000FF);
    }
    
    let fPlatforms = gameState.fakePlatforms.children.entries;
    for (let i = 0; i < fPlatforms.length; i++) {
      fPlatforms[i].body.allowGravity = false;
      fPlatforms[i].body.immovable = true;
      fPlatforms[i].body.setVelocityX(-speed);
      fPlatforms[i].setDebugBodyColor(0xFFFFFF);
    }
    
    let spikes = gameState.spikes.children.entries;
    for (let i = 0; i < spikes.length; i++) {
      spikes[i].body.allowGravity = false;
      spikes[i].body.immovable = true;
      spikes[i].body.setVelocityX(-speed);
      spikes[i].setDebugBodyColor(0xFF0000);
      spikes[i].setSize(8, 20);
    }
    
    let portals = gameState.portals.children.entries;
    for (let i = 0; i < portals.length; i++) {
      portals[i].body.allowGravity = false;
      portals[i].body.immovable = true;
      portals[i].body.setVelocityX(-speed);
      portals[i].setDebugBodyColor(0x00FFFF);
    }
    
    let trampolines = gameState.trampolines.children.entries;
    for (let i = 0; i < trampolines.length; i++) {
      trampolines[i].body.allowGravity = false;
      trampolines[i].body.immovable = true;
      trampolines[i].body.setVelocityX(-speed);
      trampolines[i].setDebugBodyColor(0xFF0000);
      trampolines[i].setSize(32, 10);
      trampolines[i].setOffset(0, 22);
    }
    
    this.physics.add.collider(gameState.player, gameState.platforms, null, null, this);
    
    this.physics.add.overlap(gameState.player, gameState.portals, function() {
      this.scene.systems.time.delayedCall(50, function() {
        time = 0;
        if (this.level > localStorage.getItem('level')) {
          localStorage.setItem('level', this.level);
          if (this.level == 3 || this.level == 6 || this.level == 9 || this.level == 11) {
            alert('New skin unlocked! Check in skins menu to try it!');
          }
        }
        this.scene.start("WinScene");
      }, [], this);
    }, null, this);
    
    this.physics.add.overlap(gameState.player, gameState.spikes, function() {
      gameState.player.jumpForce = 0;
      gameState.player.tint = 0xFF0000;
      this.scene.systems.time.delayedCall(100, function() {
        this.scene.restart();
      }, [], this);
    }, null, this);
    
    this.physics.add.overlap(gameState.player,gameState.trampolines,function(player,trampoline) {
      player.flipY = true;
      player.setGravity(0, -700);
      this.scene.systems.time.delayedCall(1500, function() {
        console.debug('called');
        player.setGravity(0, 0);
        player.flipY = false;
        if (this.level == 7 || this.level == 8) {
          this.scene.restart();
        }
      }, [], this);
    }, null, this);
  }
}
