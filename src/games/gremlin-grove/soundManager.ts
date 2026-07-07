import { ASSET_BASE } from './constants'

const VOLUME = 0.8

/** Loads and plays short SFX clips. Missing/unloaded clips degrade silently. */
export class SoundManager {
  private clips: Record<string, HTMLAudioElement> = {}
  private muted = false

  preload(names: string[]) {
    for (const name of names) {
      const audio = new Audio(`${ASSET_BASE}/${name}.mp3`)
      audio.volume = VOLUME
      audio.load()
      this.clips[name] = audio
    }
  }

  play(name: string) {
    if (this.muted) return
    const clip = this.clips[name]
    if (!clip) return
    // cloneNode() doesn't carry over the .volume IDL property, so set it again.
    const instance = clip.cloneNode(true) as HTMLAudioElement
    instance.volume = VOLUME
    instance.play().catch(() => {})
  }

  setMuted(muted: boolean) {
    this.muted = muted
  }
}
