import type p5 from 'p5'
import { Entity } from './entity'
import type { Direction } from './types'

/** Player entity — tracks lives, facing direction, speed boost, and spawn point. */
export class Wizard extends Entity {
  private lives = 0
  private currentDirection: Direction = 'U'
  private ogX = 0
  private ogY = 0

  private wizardUp: p5.Image
  private wizardDown: p5.Image
  private wizardLeft: p5.Image
  private wizardRight: p5.Image

  constructor(wizardUp: p5.Image, wizardDown: p5.Image, wizardLeft: p5.Image, wizardRight: p5.Image) {
    super(wizardUp, 0, 0)
    this.wizardUp = wizardUp
    this.wizardDown = wizardDown
    this.wizardLeft = wizardLeft
    this.wizardRight = wizardRight
    this.speed = 2
  }

  /** Draws the wizard using whichever directional sprite is currently facing. */
  drawFacing(p: p5, direction: p5.Image) {
    p.image(direction, this.x, this.y)
    this.x += this.xVel
    this.y += this.yVel
  }

  override up() { this.currentDirection = 'U'; this.yVel = -this.speed }
  override down() { this.currentDirection = 'D'; this.yVel = this.speed }
  override left() { this.currentDirection = 'L'; this.xVel = -this.speed }
  override right() { this.currentDirection = 'R'; this.xVel = this.speed }

  currentface(): Direction { return this.currentDirection }

  stop() { this.xVel = 0; this.yVel = 0 }

  getWup() { return this.wizardUp }
  getWdown() { return this.wizardDown }
  getWleft() { return this.wizardLeft }
  getWright() { return this.wizardRight }

  setOG(x: number, y: number) { this.ogX = x; this.ogY = y }

  setSpeed(newSpeed: number) { this.speed = newSpeed }

  birth(lnum: number) { this.lives = lnum }
  getLives() { return this.lives }

  death() {
    this.x = this.ogX
    this.y = this.ogY
    this.lives -= 1
  }
}
