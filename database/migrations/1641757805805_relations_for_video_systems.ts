import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class RelationsForVideoSystems extends BaseSchema {
  public async up() {
    this.schema.createTable('formations_series', (table) => {
      table.uuid('formation_id').references('id').inTable('formations')
      table.uuid('series_id').references('id').inTable('series')
    })
  }

  public async down() {
    this.schema.dropTable('formations_series')
  }
}
