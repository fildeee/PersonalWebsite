import type p5 from 'p5'

/** Static map tile (wall/exit/portal/power-up/empty floor). */
export class Block {
  protected blockImage?: p5.Image
  protected width = 20
  protected height = 20
  protected xcord = 0
  protected ycord = 0
  protected breakable = false
  protected broken = false
  protected pixelCount = 0
  protected destroyed = false

  constructor(blockImage: p5.Image)
  constructor(blockImage: p5.Image, xcord: number, ycord: number)
  constructor(xcord: number, ycord: number)
  constructor(a: p5.Image | number, b?: number, c?: number) {
    if (typeof a === 'number') {
      this.xcord = a
      this.ycord = b as number
    } else {
      this.blockImage = a
      if (b !== undefined && c !== undefined) {
        this.xcord = b
        this.ycord = c
      }
    }
  }

  isbreakable() { return this.breakable }

  draw(p: p5) {
    if (this.blockImage) p.image(this.blockImage, this.xcord, this.ycord)
  }

  getX() { return this.xcord }
  getY() { return this.ycord }

  setYcord(y: number) { this.ycord = y }
  setXcord(x: number) { this.xcord = x }
  setBroken(x: boolean) { this.broken = x }
  getDestroyed() { return this.destroyed }
  getcounter() { return this.pixelCount }
}
