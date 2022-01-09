import { DateTime } from 'luxon'
import { BaseModel, column } from '@ioc:Adonis/Lucid/Orm'

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
  public slug: string

  @column()
  public introductionUrl: string | null

  @column()
  public logoUrl: string | null
}
