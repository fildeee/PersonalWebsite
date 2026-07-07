import type p5 from 'p5'
import { Entity } from './entity'
import type { Block } from './block'
import type { Direction } from './types'

/** Enemy entity — wanders randomly when not moving, respawns on death. */
export class Gremlin extends Entity {
  private currentDirection: Direction = 'D'

  constructor(entityImg: p5.Image, x: number, y: number) {
    super(entityImg, x, y)
    this.speed = 1
  }

  currentface(): Direction { return this.currentDirection }

  /** Picks a random direction to wander in; returns true if movement was (re)started. */
  movement(): boolean {
    if (!this.moving) {
      const dirChose = Math.floor(Math.random() * 4)

      if (dirChose === 0) { this.up(); this.moving = true; this.currentDirection = 'U' }
      if (dirChose === 1) { this.down(); this.moving = true; this.currentDirection = 'D' }
      if (dirChose === 2) { this.left(); this.moving = true; this.currentDirection = 'L' }
      if (dirChose === 3) { this.right(); this.moving = true; this.currentDirection = 'R' }

      return true
    }
    return false
  }

  death(block: Block) {
    this.x = block.getX()
    this.y = block.getY()
  }
}
