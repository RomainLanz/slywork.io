import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class Episodes extends BaseSchema {
  protected tableName = 'episodes'

  public async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.uuid('id').primary().defaultTo(this.db.rawQuery('uuid_generate_v4()').knexQuery)
      table.timestamp('created_at', { useTz: true })
      table.timestamp('updated_at', { useTz: true })
      table.timestamp('released_at', { useTz: true })
      table.string('name').notNullable()
      table.text('description').notNullable()
      table.string('slug').notNullable().unique()
      table.integer('duration').unsigned().nullable()
      table.string('video_url').nullable()
      table.integer('difficulty_level').unsigned().notNullable()
      table.uuid('series_id').nullable().references('id').inTable('series')
    })
  }

  public async down() {
    this.schema.dropTable(this.tableName)
  }
}
