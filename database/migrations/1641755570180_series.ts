import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class Series extends BaseSchema {
  protected tableName = 'series'

  public async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')
      table.timestamp('created_at', { useTz: true })
      table.timestamp('updated_at', { useTz: true })
      table.timestamp('released_at', { useTz: true }).nullable()
      table.string('name').notNullable()
      table.string('description').notNullable()
      table.string('slug').notNullable()
      table.string('logo_url').nullable()
      table.integer('difficulty_level').notNullable()
    })
  }

  public async down() {
    this.schema.dropTable(this.tableName)
  }
}
