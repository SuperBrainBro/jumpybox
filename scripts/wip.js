export default class WorkInProgress extends Phaser.Scene {
 constructor () {
  super("WorkInProgress");
 }
 create() {
  let font = {
    color: '#000000'
  };
  this.add.text(300, 300, "This is Work In Progress", font);
  this.back = this.add.text(20, 20, '<--', font);
  this.back.setInteractive();
  this.back.on('pointerup', function() {
    this.scene.scene.start('MainMenu');
  }, null, this);
 }
}