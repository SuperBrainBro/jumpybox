let icon;

export default class WinScene extends Phaser.Scene {
  constructor () {
    super("WinScene");
  }
  
  create() {
    this.scene.backgroundColor = "#00ff00";
    
    let font = {
      color: '#000000',
      fontSize: 24
    };
    
    icon = this.physics.add.sprite(250, 0, 'icon');
    icon.setCollideWorldBounds(true);
    icon.setBounce(0.9);
    icon.setInteractive();
    icon.on('pointerup', function() {
      icon.y = 0;
      icon.setBounce(0.9);
    });
    this.cursors = this.input.keyboard.createCursorKeys();

    
    this.add.text(350, 200, 'YOU WIN!', font);
    this.button = this.add.text(280, 260, 'Return to Level Select', font);
    this.button.setInteractive();
    
    this.button.on('pointerup', function() {
      this.scene.scene.start("LevelSelect");
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