import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class Formations extends BaseSchema {
  protected tableName = 'formations'

  public async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')
      table.timestamp('created_at', { useTz: true })
      table.timestamp('updated_at', { useTz: true })
      table.timestamp('released_at', { useTz: true }).nullable()
      table.string('name').notNullable()
      table.text('description').notNullable()
      table.string('slug').notNullable().unique()
      table.string('introduction_url').nullable()
      table.string('logo_url').nullable()
    })
  }

  public async down() {
    this.schema.dropTable(this.tableName)
  }
}
