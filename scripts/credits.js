export default class CreditsScene extends Phaser.Scene {
  constructor() {
    super('CreditsScene');
  }
  create() {
    
    let font = {
      color: '#000000'
    };
    
    let back = this.add.text(50, 50, '<---', font);
    back.setInteractive();
    back.on('pointerup', function() {
      this.scene.scene.start('MainMenu');
    });
    
    this.add.text(300, 100, 'Programmed by Nooh Alavi', font);
    this.add.text(300, 150, 'Artwork by Nooh Alavi', font);
    this.add.text(300, 200, 'Additional Art by Hamza Hussein', font);
    this.add.text(300, 250, 'Sounds by Yahya Patel', font);
  }
}