import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class Episodes extends BaseSchema {
  protected tableName = 'episodes'

  public async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')
      table.timestamp('created_at', { useTz: true })
      table.timestamp('updated_at', { useTz: true })
      table.timestamp('released_at', { useTz: true })
      table.string('name').notNullable()
      table.text('description').notNullable()
      table.string('slug').notNullable()
      table.integer('duration').nullable()
      table.string('video_url').nullable()
      table.integer('difficulty_level').notNullable()
    })
  }

  public async down() {
    this.schema.dropTable(this.tableName)
  }
}