import { Entity } from './entity'
import { Block } from './block'
import { Gremlin } from './gremlin'
import { Ball } from './ball'
import { Wizard } from './wizard'

/** Pure collision-detection/response logic — ported 1:1 from GameManager.java. */
export class GameManager {
  entityBlockCollisions(entity: Entity, block: Block): boolean {
    const width = 20
    const xDistance = (entity.getX() + width / 2) - (block.getX() + width / 2)
    const yDistance = (entity.getY() + width / 2) - (block.getY() + width / 2)

    if (Math.abs(xDistance) < width) {
      if (Math.abs(yDistance) < width) {
        const xOverlap = width - Math.abs(xDistance)
        const yOverlap = width - Math.abs(yDistance)

        if (xOverlap >= yOverlap) {
          if (yDistance > 0) entity.setY(Math.trunc(yOverlap))
          else entity.setY(Math.trunc(-yOverlap))

          if (entity instanceof Gremlin) {
            entity.setYVel(0)
            if (entity.getXVel() === 0) entity.setMove(false)
          }
        } else {
          if (xDistance > 0) entity.setX(Math.trunc(xOverlap))
          else entity.setX(Math.trunc(-xOverlap))

          if (entity instanceof Gremlin) {
            entity.setXVel(0)
            if (entity.getYVel() === 0) entity.setMove(false)
          }
        }
        if (entity instanceof Ball) return true
      }
    }
    return false
  }

  entityCollisions(entity1: Entity, entity2: Entity): boolean {
    const width = 16
    const xDistance = (entity1.getX() + width / 2) - (entity2.getX() + width / 2)
    const yDistance = (entity1.getY() + width / 2) - (entity2.getY() + width / 2)

    if (Math.abs(xDistance) < width) {
      if (Math.abs(yDistance) < width) {
        if (entity1 instanceof Wizard) entity1.death()
        if (entity1 instanceof Ball && entity2 instanceof Ball) return true
      }
    }
    return false
  }

  /**
   * @param eBlocks Empty tiles; one is randomly chosen (at least 200px from the
   * player) as the gremlin's respawn point.
   */
  fbgCollisions(fireball: Ball, gremlin: Gremlin, eBlocks: Block[], player: Wizard): boolean {
    const width = 18
    const xDistance = (fireball.getX() + width / 2) - (gremlin.getX() + width / 2)
    const yDistance = (fireball.getY() + width / 2) - (gremlin.getY() + width / 2)

    if (Math.abs(xDistance) < width) {
      if (Math.abs(yDistance) < width) {
        let j = Math.floor(Math.random() * eBlocks.length)
        let spawnblock = eBlocks[j]

        while (
          (spawnblock.getX() < player.getX() + 200 && spawnblock.getX() > player.getX() - 200) &&
          (spawnblock.getY() < player.getY() + 200 && spawnblock.getY() > player.getY() - 200)
        ) {
          j = Math.floor(Math.random() * eBlocks.length)
          spawnblock = eBlocks[j]
        }

        gremlin.death(spawnblock)
        return true
      }
    }
    return false
  }
}
