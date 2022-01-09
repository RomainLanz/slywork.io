import { DateTime } from 'luxon'
import { BaseModel, column } from '@ioc:Adonis/Lucid/Orm'
import { DifficultyLevel } from 'App/Enums/DifficultyLevel'
import { slugify } from '@ioc:Adonis/Addons/LucidSlugify'

export default class Serie extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime

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
  public logoUrl: string | null

  @column()
  public difficultyLevel: DifficultyLevel
}
