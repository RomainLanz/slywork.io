import { DateTime } from 'luxon'
import { BaseModel, column, HasMany, hasMany } from '@ioc:Adonis/Lucid/Orm'
import { slugify } from '@ioc:Adonis/Addons/LucidSlugify'
import Episode from 'App/Models/Episode'
import { DifficultyLevel } from 'App/Enums/DifficultyLevel'

export default class Series extends BaseModel {
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

  @hasMany(() => Episode)
  public episodes: HasMany<typeof Episode>
}
