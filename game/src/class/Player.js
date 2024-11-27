import { INITIAL_FRAME_ENGINE, PATH_ENGINE_IMAGE, PATH_SPACESHIP_IMAGE, PATH_SPRITES_IMAGE } from "../utils/constants.js";
import Projectile from "./Projectile.js";

class Player{
  width;
  height;
  position;
  velocity;
  image;
  
    constructor(canvasWidth, canvasHeight) {
      this.width = 48 * 2;
      this.height = 48 * 2;
      this.velocity = 5

      this.position = {
        x: canvasWidth / 2 - this.width / 2,
        y: canvasHeight - this.height - 30,
      };

      this.image = this.getImage(PATH_SPACESHIP_IMAGE)
      this.engineImage = this.getImage(PATH_ENGINE_IMAGE)
      this.spritImage = this.getImage(PATH_SPRITES_IMAGE)
      
      this.engineFire = 0
      this.framesCounter = INITIAL_FRAME_ENGINE
  };

  getImage(path) {
    const image = new Image();
    image.src = path;
    return image;
  };


  moveLeft() {
    this.position.x -= this.velocity
  }
  
  moveRight() {
    this.position.x += this.velocity
  }  

  draw(ctx) {

    ctx.drawImage(
      this.spritImage,
      this.engineFire,
      0,
      48,
      48,
      this.position.x,
      this.position.y + 10,
      this.width,
      this.height,

    );

    ctx.drawImage(
      this.engineImage,
      this.position.x,
      this.position.y +10,
      this.width,
      this.height, 
    );

    ctx.drawImage(
      this.image,
      this.position.x,
      this.position.y,
      this.width,
      this.height
    );

    this.updateFireEngine()

  }

  updateFireEngine() {

    if (this.framesCounter === 0) {
      this.engineFire = this.engineFire === 96 ? 0: this.engineFire +48
      this.framesCounter = INITIAL_FRAME_ENGINE
    }
    this.framesCounter--

  }

  shoot(playerBullets) {
    const bullet = new Projectile({
      x: this.position.x + this.width / 2-1,
      y: this.position.y + 2,

      
    }, -7);
    playerBullets.push(bullet)
  }
};

export default Player;