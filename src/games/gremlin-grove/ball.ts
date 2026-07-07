import type p5 from 'p5'
import { Entity } from './entity'
import type { Direction } from './types'

/** Projectile entity (fireball or slime) — moves in one fixed direction per frame. */
export class Ball extends Entity {
  private direction: Direction

  constructor(entityImg: p5.Image, x: number, y: number, direction: Direction) {
    super(entityImg, x, y)
    this.direction = direction
    this.speed = 4
  }

  setdir(dir: Direction) { this.direction = dir }

  movement() {
    if (this.direction === 'U') this.up()
    if (this.direction === 'D') this.down()
    if (this.direction === 'L') this.left()
    if (this.direction === 'R') this.right()
  }
}
