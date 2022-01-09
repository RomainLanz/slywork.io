import BaseSchema from '@ioc:Adonis/Lucid/Schema'
import { UserRole } from 'App/Enums/UserRole'
import { UserStatus } from 'App/Enums/UserStatus'

export default class UsersSchema extends BaseSchema {
  protected tableName = 'users'

  public async up() {
    await this.raw('create extension IF NOT EXISTS "uuid-ossp" schema pg_catalog version "1.1";')

    this.schema.createTable(this.tableName, (table) => {
      table.uuid('id').primary().defaultTo(this.db.rawQuery('uuid_generate_v4()').knexQuery)
      table.timestamp('created_at', { useTz: true }).notNullable()
      table.timestamp('updated_at', { useTz: true }).notNullable()
      table.string('username', 80).notNullable().unique()
      table.string('email', 255).notNullable().unique()
      table.string('password', 180).notNullable()
      table.integer('status').unsigned().notNullable().defaultTo(UserStatus.Pending)
      table.integer('role').unsigned().notNullable().defaultTo(UserRole.Member)
      table.string('remember_me_token').nullable()
    })
  }

  public async down() {
    this.schema.dropTable(this.tableName)
  }
}
