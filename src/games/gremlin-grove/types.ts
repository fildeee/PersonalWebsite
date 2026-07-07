export type Direction = 'U' | 'D' | 'L' | 'R'

export interface LevelConfig {
  layout: string
  wizard_cooldown: number
  enemy_cooldown: number
}

export interface GameConfig {
  levels: LevelConfig[]
  lives: number
}
