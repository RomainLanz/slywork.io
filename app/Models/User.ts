import { DateTime } from 'luxon'
import Hash from '@ioc:Adonis/Core/Hash'
import { column, beforeSave, BaseModel } from '@ioc:Adonis/Lucid/Orm'
import { UserStatus } from 'App/Enums/UserStatus'
import { UserRole } from 'App/Enums/UserRole'

export default class User extends BaseModel {
  @column({ isPrimary: true })
  public id: string

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime

  @column()
  public username: string

  @column()
  public email: string

  @column({ serializeAs: null })
  public password?: string

  @column()
  public rememberMeToken?: string

  @column()
  public status: UserStatus

  @column()
  public role: UserRole

  @column()
  public oauthProviderId?: string

  @column()
  public oauthProviderName?: string

  @beforeSave()
  public static async hashPassword(user: User) {
    if (user.$dirty.password && user.password) {
      user.password = await Hash.make(user.password)
    }
  }
}
