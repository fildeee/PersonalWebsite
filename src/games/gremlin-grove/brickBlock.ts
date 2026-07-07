import type p5 from 'p5'
import { Block } from './block'

/** Destructible brick wall — cycles through 4 "destroyed" sprite frames once broken. */
export class BrickBlock extends Block {
  private dBlock1: p5.Image
  private dBlock2: p5.Image
  private dBlock3: p5.Image
  private dBlock4: p5.Image

  constructor(
    blockImage: p5.Image,
    dBlock1: p5.Image,
    dBlock2: p5.Image,
    dBlock3: p5.Image,
    dBlock4: p5.Image,
    xcord: number,
    ycord: number,
  ) {
    super(blockImage, xcord, ycord)
    this.dBlock1 = dBlock1
    this.dBlock2 = dBlock2
    this.dBlock3 = dBlock3
    this.dBlock4 = dBlock4
    this.breakable = true
  }

  override draw(p: p5) {
    if (!this.broken) {
      if (this.blockImage) p.image(this.blockImage, this.xcord, this.ycord)
      this.pixelCount = 0
    } else {
      this.pixelCount++
      if (this.pixelCount < 4) p.image(this.dBlock1, this.xcord, this.ycord)
      if (this.pixelCount < 8) p.image(this.dBlock2, this.xcord, this.ycord)
      if (this.pixelCount < 12) p.image(this.dBlock3, this.xcord, this.ycord)
      if (this.pixelCount < 16) p.image(this.dBlock4, this.xcord, this.ycord)
    }
  }
}
