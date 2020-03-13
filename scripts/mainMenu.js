let icon;

export default class MainMenu extends Phaser.Scene {
  constructor () {
    super("MainMenu");
  }
  
  preload() {
    let skin = localStorage.getItem('skin');
    if (skin === null) {
      skin = 'assets/player.png';
    }
    this.load.image('icon', skin);
    document.getElementById("favicon").href = skin;
  }
  
  create() {
    
    this.input.mouse.disableContextMenu();
    
    let font = {
      fontSize: 24,
      color: "#000000"
    };
    
    let otherFont = {
      fontSize: 16,
      color: '#000000'
    };
    
    
    icon = this.physics.add.sprite(250, 0, 'icon');
    icon.setCollideWorldBounds(true);
    icon.setBounce(0.9);
    icon.setInteractive();
    icon.on('pointerup', function() {
      icon.y = 0;
      icon.setBounce(0.9);
    });
    
    this.add.text(335, 100, 'JUMPY BOX', font);
    this.add.text(288, 124, 'Programmed by Nooh Alavi', otherFont);
    this.add.text(338, 552, 'Version 1.0.0', otherFont);
    this.cursors = this.input.keyboard.createCursorKeys();
    
    this.playButton = this.add.text(375, 300, 'PLAY', font);
    this.playButton.setInteractive();
    this.playButton.on('pointerup', function() {
      this.scene.scene.start('LevelSelect');
    }, null, this);
    
    
    this.skinButton = this.add.text(375, 350, 'SKINS', font);
    this.skinButton.setInteractive();
    this.skinButton.on('pointerup', function() {
      this.scene.scene.start('SkinSelect');
    }, null, this);
    
    this.resetButton = this.add.text(330, 400, 'CLEAR DATA', font);
    this.resetButton.setInteractive();
    this.resetButton.on('pointerup', function() {
      if (window.confirm('Are you sure you want to clear all your game data? This will make your levels and skins reset and cannot be undone.')) {
        localStorage.clear();
        location.reload();
      }
    }, null, this);
    
    this.creditsButton = this.add.text(360, 450, 'CREDITS', font);
    this.creditsButton.setInteractive();
    this.creditsButton.on('pointerup', function() {
      this.scene.scene.start('CreditsScene');
    }, null, this);
    
    this.quitButton = this.add.text(375, 500, 'QUIT', font);
    this.quitButton.setInteractive();
    this.quitButton.on('pointerup', function() {
      if (window.confirm("Are you sure you want to quit?")) {
        window.close();
      }
    }, null, this);
  }
  
  update() {
    if (this.cursors.right.isDown) {
      icon.x++;
    } else if (this.cursors.left.isDown) {
      icon.x--;
    }
  }
}
