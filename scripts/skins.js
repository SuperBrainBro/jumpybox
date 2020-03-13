export class SkinSelect extends Phaser.Scene {
  constructor() {
    super('SkinSelect');
    this.skin = localStorage.getItem('skin') || 'assets/player.png';
  }
  create() {
    
    let font = {
      fontSize: 24,
      color: '#000000'
    };
    
    this.add.text(300, 20, '  Switching skins \nMay require refresh', font);
    
    let back = this.add.text(50, 50, '<---', font);
    back.setInteractive();
    back.on('pointerup', function() {
      this.scene.scene.start('MainMenu');
    });
    
    let skin1 = this.add.text(350, 150, 'Normal', font);
    skin1.setInteractive();
    skin1.on('pointerup', function() {
      this.skin = 'assets/player.png';
      localStorage.setItem('skin', this.skin);
    });
    
    if (Number(localStorage.getItem('level')) > 2) {
      let skin2 = this.add.text(350, 250, 'Tomato', font);
      skin2.setInteractive();
      skin2.on('pointerup', function() {
        this.skin = 'assets/tomatoSkin.png';
        localStorage.setItem('skin', this.skin);
      });
    }
    
    if (Number(localStorage.getItem('level') > 5)) {
      let skin3 = this.add.text(350, 350, 'Zombie', font);
      skin3.setInteractive();
      skin3.on('pointerup', function() {
        this.skin = 'assets/zombieSkin.png';
        localStorage.setItem('skin', this.skin);
      });
    }
    
    if (Number(localStorage.getItem('level') > 8)) {
      let skin4 = this.add.text(350, 450, 'Reaper', font);
      skin4.setInteractive();
      skin4.on('pointerup', function() {
        this.skin = 'assets/reaperSkin.png';
        localStorage.setItem('skin', this.skin);
      });
    }
    
    if (Number(localStorage.getItem('level') > 10)) {
      let skin5 = this.add.text(350, 550, 'Robot', font);
      skin5.setInteractive();
      skin5.on('pointerup', function() {
        this.skin = 'assets/robotSkin.png';
        localStorage.setItem('skin', this.skin);
      });
    }
  }
}
