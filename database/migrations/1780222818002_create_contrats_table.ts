import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected tableName = 'contrats'

  async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')
      table.string('client').notNullable()
      table.string('name_contract').notNullable()
      table.string('client_adress').notNullable()
      table.string('name_event').notNullable()
      table.timestamp('begin').notNullable()
      table.timestamp('end').notNullable()
      table.string('contact').notNullable()
      table.text('mission').nullable()
      table.boolean('is_signed').defaultTo(false)
      table.timestamp('created_at')
      table.timestamp('updated_at')
    })
  }

  async down() {
    this.schema.dropTable(this.tableName)
  }
}
