import { DateTime } from 'luxon'
import { BaseModel, BelongsTo, belongsTo, column } from '@ioc:Adonis/Lucid/Orm'
import { slugify } from '@ioc:Adonis/Addons/LucidSlugify'
import Series from 'App/Models/Series'
import { DifficultyLevel } from 'App/Enums/DifficultyLevel'

export default class Episode extends BaseModel {
  @column({ isPrimary: true })
  public id: string

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

  @column()
  public order: number[]

  @column()
  public seriesId: number

  @belongsTo(() => Series)
  public series: BelongsTo<typeof Series>
}
