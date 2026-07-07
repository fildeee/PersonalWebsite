import type p5 from 'p5'

/** Base class for all moving game objects (player, gremlins, projectiles). */
export class Entity {
  protected x: number
  protected y: number
  protected speed = 0
  protected xVel = 0
  protected yVel = 0
  protected entityImg: p5.Image
  protected moving = false

  constructor(entityImg: p5.Image, x: number, y: number) {
    this.entityImg = entityImg
    this.x = x
    this.y = y
  }

  draw(p: p5) {
    p.image(this.entityImg, this.x, this.y)
    this.x += this.xVel
    this.y += this.yVel
  }

  up() { this.yVel = -this.speed }
  down() { this.yVel = this.speed }
  left() { this.xVel = -this.speed }
  right() { this.xVel = this.speed }

  getX() { return this.x }
  getY() { return this.y }
  getXVel() { return this.xVel }
  getYVel() { return this.yVel }
  getSpeed() { return this.speed }

  setY(yval: number) { this.y += yval }
  setX(xval: number) { this.x += xval }
  setYVel(yval: number) { this.yVel = yval }
  setXVel(xval: number) { this.xVel = xval }
  setYcord(ycord: number) { this.y = ycord }
  setXcord(xcord: number) { this.x = xcord }

  setMove(moveStatus: boolean) { this.moving = moveStatus }
}
