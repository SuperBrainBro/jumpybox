export default class Player extends Phaser.Physics.Arcade.Sprite {
  constructor (config) {
    super(config.scene, config.x, config.y, config.key);
    this.speed = this.maxSpeed;
    this.input = config.input;
    
    this.jumped = false;
    
    this.jumpForce = config.jumpForce;
    
    this.scene.add.existing(this);
    this.scene.physics.add.existing(this);
    
    this.setDebugBodyColor(0x00FF00);
    this.setBounce(0.2);
  }
  update() {
    if (this.y > 600 || this.x < 16 || this.y < -300) {
      return 'isDead';
    }
    
    if (this.body.touching.down) {
      this.jumped = false;
    }
    
    if ((this.input.space.isDown || this.input.up.isDown)) {
      this.jump();
    }
  }
  jump() {
    if (!this.jumped) {
      this.scene.sound.play('jump');
      this.setVelocityY(- this.jumpForce);
      this.jumped = true;
    }
  }
}
