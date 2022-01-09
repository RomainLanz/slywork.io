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
      table.string('slug').notNullable().unique()
      table.integer('duration').unsigned().nullable()
      table.string('video_url').nullable()
      table.integer('difficulty_level').unsigned().notNullable()
      table.integer('series_id').unsigned().nullable().references('id').inTable('series')
    })
  }

  public async down() {
    this.schema.dropTable(this.tableName)
  }
}
