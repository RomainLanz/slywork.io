import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class Series extends BaseSchema {
  protected tableName = 'series'

  public async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.uuid('id').primary().defaultTo(this.db.rawQuery('uuid_generate_v4()').knexQuery)
      table.timestamp('created_at', { useTz: true })
      table.timestamp('updated_at', { useTz: true })
      table.timestamp('released_at', { useTz: true }).nullable()
      table.string('name').notNullable()
      table.string('description').notNullable()
      table.string('slug').notNullable().unique()
      table.string('logo_url').nullable()
      table.integer('difficulty_level').unsigned().notNullable()
      table.json('order').notNullable().defaultTo('[]')
    })
  }

  public async down() {
    this.schema.dropTable(this.tableName)
  }
}
