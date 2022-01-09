import { DateTime } from 'luxon'
import { BaseModel, column, manyToMany, ManyToMany } from '@ioc:Adonis/Lucid/Orm'
import { slugify } from '@ioc:Adonis/Addons/LucidSlugify'
import Series from 'App/Models/Series'

export default class Formation extends BaseModel {
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
  public introductionUrl: string | null

  @column()
  public logoUrl: string | null

  @column()
  public order: number[]

  @manyToMany(() => Series)
  public series: ManyToMany<typeof Series>
}
