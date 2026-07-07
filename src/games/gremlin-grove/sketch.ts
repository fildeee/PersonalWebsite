import type p5 from 'p5'
import { WIDTH, HEIGHT, ASSET_BASE } from './constants'
import { Block } from './block'
import { BrickBlock } from './brickBlock'
import { Ball } from './ball'
import { Gremlin } from './gremlin'
import { Wizard } from './wizard'
import { GameManager } from './gameManager'
import { SoundManager } from './soundManager'
import type { GameConfig } from './types'

/**
 * Port of gremlins.App (Java/Processing) to p5.js instance mode.
 *
 * p5 v2 has no separate `preload()` lifecycle — asset loads are `await`ed
 * directly inside `setup()`. Unlike the Java original (whose `Restart()` just
 * re-runs the whole of `setup()`, re-reading files from disk each time),
 * `restart()` here only resets game *state* and reuses the already-loaded
 * assets — re-fetching identical images/text over the network on every 'R'
 * press would be pure overhead with no behavioral difference.
 */
export class GremlinGroveGame {
  private gm = new GameManager()
  private sound = new SoundManager()

  // title screen
  private skull!: p5.Image
  private gothic!: p5.Font
  private gameOver = false

  // player
  private timer = -1
  private player!: Wizard
  private currentDirection!: p5.Image
  private walking = false
  private keyR = 0

  // map
  private m1blocks: Block[] = []
  private gremlins: Gremlin[] = []
  private emptyBlocks: Block[] = []
  private stone!: p5.Image
  private brick!: p5.Image
  private brick1!: p5.Image
  private brick2!: p5.Image
  private brick3!: p5.Image
  private brick4!: p5.Image
  private gremlinimg!: p5.Image
  private levelRunning = false
  private eDoor!: Block
  private portal1!: Block
  private portal2!: Block
  private powerUp!: Block
  private puCounter = 0
  private puBoolean = false

  // config / levels
  private config!: GameConfig
  private levelLines: Record<string, string[]> = {}

  // fireballs / slime
  private fireball: Ball[] = []
  private slime: Ball[] = []
  private fireballCD = 0
  private slimeCD = 0
  private fbcounter = 0
  private slimecounter = 0
  private fbimg!: p5.Image
  private slimeimg!: p5.Image
  private fbcanshoot = true
  private fbonline = false

  async setup(p: p5) {
    p.createCanvas(WIDTH, HEIGHT)
    p.frameRate(60)

    const base = ASSET_BASE
    const [config, level1Lines, level2Lines] = await Promise.all([
      p.loadJSON(`${base}/config.json`) as Promise<GameConfig>,
      p.loadStrings(`${base}/level1.txt`),
      p.loadStrings(`${base}/level2.txt`),
    ])
    this.config = config
    this.levelLines['level1.txt'] = level1Lines
    this.levelLines['level2.txt'] = level2Lines

    this.skull = await p.loadImage(`${base}/skull.png`)
    this.gothic = await p.loadFont(`${base}/gothic.ttf`)

    this.sound.preload(['wizard_shot', 'explode', 'hurt'])

    const [wizard0, wizard1, wizard2, wizard3, gremlinimg, exitImg, blueImg, redImg, powerImg, fbimg, slimeimg, stone, brick, brick1, brick2, brick3, brick4] =
      await Promise.all([
        p.loadImage(`${base}/wizard0.png`),
        p.loadImage(`${base}/wizard1.png`),
        p.loadImage(`${base}/wizard2.png`),
        p.loadImage(`${base}/wizard3.png`),
        p.loadImage(`${base}/gremlin.png`),
        p.loadImage(`${base}/Exit.png`),
        p.loadImage(`${base}/BluePortal.png`),
        p.loadImage(`${base}/RedPortal.png`),
        p.loadImage(`${base}/SpeedPowerUp.png`),
        p.loadImage(`${base}/fireball.png`),
        p.loadImage(`${base}/slime.png`),
        p.loadImage(`${base}/stonewall.png`),
        p.loadImage(`${base}/brickwall.png`),
        p.loadImage(`${base}/brickwall_destroyed0.png`),
        p.loadImage(`${base}/brickwall_destroyed1.png`),
        p.loadImage(`${base}/brickwall_destroyed2.png`),
        p.loadImage(`${base}/brickwall_destroyed3.png`),
      ])

    // wizardup=wizard2, wizarddown=wizard3, wizardleft=wizard0, wizardright=wizard1 — matches App.java's constructor order
    this.player = new Wizard(wizard2, wizard3, wizard0, wizard1)
    this.gremlinimg = gremlinimg
    this.eDoor = new Block(exitImg)
    this.portal1 = new Block(blueImg)
    this.portal2 = new Block(redImg)
    this.powerUp = new Block(powerImg)
    this.fbimg = fbimg
    this.slimeimg = slimeimg
    this.stone = stone
    this.brick = brick
    this.brick1 = brick1
    this.brick2 = brick2
    this.brick3 = brick3
    this.brick4 = brick4

    this.restart()
  }

  /** Resets game state to the title screen using already-loaded assets. */
  restart() {
    this.gameOver = false
    this.walking = false
    this.levelRunning = false
    this.puBoolean = false
    this.puCounter = 0
    this.fbcounter = 0
    this.slimecounter = 0
    this.fbcanshoot = true
    this.timer = -1
    this.m1blocks = []
    this.gremlins = []
    this.emptyBlocks = []
    this.fireball = []
    this.slime = []
  }

  draw(p: p5) {
    p.background(245, 245, 220)
    p.textFont(this.gothic, 128)

    if (this.timer === -1) this.startScreen(p)
    if (this.timer >= this.config.levels.length) this.winEndScreen(p)
    if (!this.gameOver) this.mapCreate(p)
    if (this.player.getLives() <= 0 && this.timer >= 0) this.loseEndScreen(p)
  }

  keyPressed(_p: p5, event?: KeyboardEvent) {
    const key = event?.keyCode ?? 0

    if (key === 82) { this.restart(); return } // R
    if (key === 13) { this.timer = 0 } // Enter (browser keyCode 13; Java AWT used 10)

    if (!this.walking) {
      if (key === 37) { this.player.left(); this.currentDirection = this.player.getWleft(); this.walking = true }
      if (key === 39) { this.player.right(); this.currentDirection = this.player.getWright(); this.walking = true }
      if (key === 38) { this.player.up(); this.currentDirection = this.player.getWup(); this.walking = true }
      if (key === 40) { this.player.down(); this.currentDirection = this.player.getWdown(); this.walking = true }
    }

    if (this.fbcanshoot) {
      if (key === 32) { // space
        this.fireball.push(new Ball(this.fbimg, this.player.getX(), this.player.getY(), this.player.currentface()))
        this.fbcanshoot = false
        this.sound.play('wizard_shot')
      }
    }

    // Prevent the page from scrolling under the game while it's focused.
    if ([32, 37, 38, 39, 40].includes(key)) return false
  }

  keyReleased(_p: p5, event?: KeyboardEvent) {
    this.keyR = event?.keyCode ?? 0
  }

  private mapCreate(p: p5) {
    if (!(-1 < this.timer && this.timer < this.config.levels.length)) return

    const levelConfig = this.config.levels[this.timer]
    const thislevel = levelConfig.layout
    this.slimeCD = Math.ceil(levelConfig.enemy_cooldown * 60)
    this.fireballCD = Math.ceil(levelConfig.wizard_cooldown * 60)

    if (this.levelRunning) {
      p.fill(0)
      p.textSize(35)
      p.text('Lives: ', WIDTH * 0.08, HEIGHT * 0.975)
      p.text(`Level ${this.timer + 1}/${this.config.levels.length}`, WIDTH * 0.31, HEIGHT * 0.975)

      let imagexcord = 120
      for (let i = 0; i < this.player.getLives(); i++) {
        p.image(this.player.getWup(), imagexcord, 680)
        imagexcord += 20
      }

      // brick-block destroyed after animation (matches Java's unguarded remove-while-iterating)
      for (let i = 0; i < this.m1blocks.length; i++) {
        if (this.m1blocks[i].getcounter() >= 16) this.m1blocks.splice(i, 1)
      }

      this.eDoor.draw(p)
      this.portal1.draw(p)
      this.portal2.draw(p)
      if (this.puBoolean) { this.powerUp.draw(p); this.player.setSpeed(2) }
      this.player.drawFacing(p, this.currentDirection)

      for (const gremlin of this.gremlins) {
        gremlin.draw(p)
        gremlin.movement()
        const livesBefore = this.player.getLives()
        this.gm.entityCollisions(this.player, gremlin)
        if (this.player.getLives() < livesBefore) this.sound.play('hurt')
      }

      for (const block of this.m1blocks) {
        block.draw(p)
        this.gm.entityBlockCollisions(this.player, block)
        for (const gremlin of this.gremlins) this.gm.entityBlockCollisions(gremlin, block)
      }

      if (this.walking) {
        if (this.keyR === 37 || this.keyR === 38 || this.keyR === 39 || this.keyR === 40) {
          if (this.player.getX() % 20 === 0 && this.player.getY() % 20 === 0) {
            this.player.stop()
            this.walking = false
            this.keyR = 0
          }
        }
      }

      p.fill(255)
      p.rect(380, 680, 100, 20)
      // Java divides two ints here (puCounter/60 and 100/8), truncating both —
      // the bar fills in visible 12px steps every 60 frames, not smoothly.
      if (Math.floor(this.puCounter / 60) < 8) {
        p.fill(255, 0, 0)
        p.rect(380, 680, Math.floor(this.puCounter / 60) * Math.floor(100 / 8), 20)
      } else {
        p.fill(0, 255, 2)
        p.rect(380, 680, 100, 20)
      }
      p.fill(0)
      p.textSize(22)
      p.text('Power Up', 395, 698)
      this.puCounter += 1
      if (this.puCounter === 480) this.puBoolean = true

      if (!this.fbcanshoot) {
        this.fbcounter += 1
        p.fill(255)
        p.rect(540, 685, 100, 10)
        p.fill(0)
        p.rect(540, 685, this.fbcounter * (100 / this.fireballCD), 10)
        if (this.fbcounter === this.fireballCD) { this.fbcounter = 0; this.fbcanshoot = true }
      }

      // Iterated back-to-front (unlike Java's forward loop) so that removing a
      // fireball on hit can't leave a later collision check reading a stale
      // index into the shrunk array.
      for (let j = this.fireball.length - 1; j >= 0; j--) {
        const fb = this.fireball[j]
        fb.draw(p)
        fb.movement()

        let hitBlock = false
        for (let i = 0; i < this.m1blocks.length; i++) {
          const block = this.m1blocks[i]
          if (this.gm.entityBlockCollisions(fb, block)) {
            this.fireball.splice(j, 1)
            this.fbonline = false
            if (block.isbreakable()) { block.setBroken(true); this.sound.play('explode') }
            hitBlock = true
            break
          }
          this.fbonline = true
        }
        if (hitBlock) continue

        let hitGremlin = false
        for (const gremlin of this.gremlins) {
          if (!this.fbonline) break
          if (this.gm.fbgCollisions(fb, gremlin, this.emptyBlocks, this.player)) {
            this.fireball.splice(j, 1)
            this.fbonline = false
            hitGremlin = true
            break
          }
        }
        if (hitGremlin) continue

        for (let i = 0; i < this.slime.length; i++) {
          if (!this.fbonline) break
          if (this.gm.entityCollisions(fb, this.slime[i])) {
            this.fireball.splice(j, 1)
            this.slime.splice(i, 1)
            break
          }
        }
      }

      this.slimecounter += 1
      if (this.slimecounter === this.slimeCD) {
        this.slimecounter = 0
        for (const gremlin of this.gremlins) {
          this.slime.push(new Ball(this.slimeimg, gremlin.getX(), gremlin.getY(), gremlin.currentface()))
        }
      }

      for (let j = 0; j < this.slime.length; j++) {
        const sl = this.slime[j]
        sl.draw(p)
        sl.movement()

        const livesBefore = this.player.getLives()
        this.gm.entityCollisions(this.player, sl)
        if (this.player.getLives() < livesBefore) this.sound.play('hurt')

        for (let i = 0; i < this.m1blocks.length; i++) {
          if (this.gm.entityBlockCollisions(sl, this.m1blocks[i])) { this.slime.splice(j, 1); break }
        }
      }
    }

    if (!this.levelRunning) {
      this.player.birth(this.config.lives)

      this.puBoolean = false
      this.puCounter = 0
      this.m1blocks = []
      this.gremlins = []
      this.emptyBlocks = []
      this.slime = []
      this.slimecounter = 0

      const lines = this.levelLines[thislevel]
      let xcord = 0
      let ycord = 0
      let uCounter = 0
      let uBeg = 0

      for (const thisline of lines) {
        uCounter += 1
        for (let i = 0; i < 36; i++) {
          const ch = thisline[i] ?? ' '
          if (ch === 'X') {
            this.m1blocks.push(new Block(this.stone, xcord, ycord))
          } else if (ch === 'B') {
            this.m1blocks.push(new BrickBlock(this.brick, this.brick1, this.brick2, this.brick3, this.brick4, xcord, ycord))
          } else if (ch === 'G') {
            this.gremlins.push(new Gremlin(this.gremlinimg, xcord, ycord))
          } else if (ch === 'W') {
            this.player.setXcord(xcord); this.player.setYcord(ycord)
            this.currentDirection = this.player.getWup()
            this.player.setOG(xcord, ycord)
          } else if (ch === 'E') {
            this.eDoor.setYcord(ycord); this.eDoor.setXcord(xcord)
          } else if (ch === 'P') {
            this.powerUp.setXcord(xcord); this.powerUp.setYcord(ycord)
          } else if (uCounter <= 14 && uCounter > 12 && uBeg < Math.floor(Math.random() * (5 - 2)) + 2) {
            this.portal1.setYcord(ycord); this.portal1.setXcord(xcord); uBeg += 1
          } else if (uCounter <= 20 && uCounter > 18 && uBeg < 10 + Math.floor(Math.random() * (15 - 2)) + 2) {
            this.portal2.setYcord(ycord); this.portal2.setXcord(xcord); uBeg += 1
          } else {
            this.emptyBlocks.push(new Block(xcord, ycord))
          }
          xcord += 20
        }
        ycord += 20
        xcord = 0
      }
      this.levelRunning = true
    }

    if (this.player.getX() === this.eDoor.getX() && this.player.getY() === this.eDoor.getY()) {
      this.timer += 1
      this.levelRunning = false
    }
    if (this.player.getX() === this.portal1.getX() && this.player.getY() === this.portal1.getY()) {
      this.player.setXcord(this.portal2.getX())
      this.player.setYcord(this.portal2.getY())
    }
    if (this.player.getX() === this.powerUp.getX() && this.player.getY() === this.powerUp.getY() && this.puBoolean) {
      this.player.setSpeed(4)
      this.puBoolean = false
      this.puCounter = 0
    }
  }

  private startScreen(p: p5) {
    p.fill(0)
    p.textSize(85)
    p.text('Gremlin Grove', WIDTH * 0.225, HEIGHT * 0.625)
    p.textSize(40)
    p.text('Press Enter To Start', WIDTH * 0.31, HEIGHT * 0.725)
    p.image(this.skull, 100, 40, 530, 347)
  }

  private winEndScreen(p: p5) {
    this.gameOver = true
    p.textSize(100)
    p.text('You Win!', WIDTH * 0.3, HEIGHT * 0.5)
  }

  private loseEndScreen(p: p5) {
    this.gameOver = true
    p.textSize(100)
    p.text('Game Over', WIDTH * 0.25, HEIGHT * 0.5)
    p.textSize(40)
    p.text('Press R to Restart', WIDTH * 0.32, HEIGHT * 0.8)
  }
}

type P5Lifecycle = p5 & {
  setup: () => void | Promise<void>
  draw: () => void
  keyPressed: (event?: KeyboardEvent) => void | boolean
  keyReleased: (event?: KeyboardEvent) => void | boolean
}

export function gremlinGroveSketch(p: p5) {
  const game = new GremlinGroveGame()
  const typedP = p as P5Lifecycle
  typedP.setup = () => game.setup(p)
  typedP.draw = () => game.draw(p)
  typedP.keyPressed = (event?: KeyboardEvent) => game.keyPressed(p, event)
  typedP.keyReleased = (event?: KeyboardEvent) => game.keyReleased(p, event)
}
