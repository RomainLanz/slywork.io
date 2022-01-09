import { DateTime } from 'luxon'
import { BaseModel, column } from '@ioc:Adonis/Lucid/Orm'
import { slugify } from '@ioc:Adonis/Addons/LucidSlugify'
import { DifficultyLevel } from 'App/Enums/DifficultyLevel'

export default class Episode extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime

  @column.dateTime()
  public releasedAt: DateTime | null

  @column()
  public name: string

  @column()
  public description: string

  @column()
  @slugify({
    strategy: 'shortId',
    fields: ['name'],
  })
  public slug: string

  @column()
  public duration: number | null

  @column()
  public videoUrl: string | null

  @column()
  public difficultyLevel: DifficultyLevel
}
