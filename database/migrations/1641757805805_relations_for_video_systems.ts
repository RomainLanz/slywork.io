import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class RelationsForVideoSystems extends BaseSchema {
  public async up() {
    this.schema.createTable('formations_series', (table) => {
      table.integer('formation_id').unsigned().references('id').inTable('formations')
      table.integer('series_id').unsigned().references('id').inTable('series')
    })
  }

  public async down() {
    this.schema.dropTable('formations_series')
  }
}
