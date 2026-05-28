import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected tableName = 'stocks'

  async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')
      table.string('name', 255).notNullable().unique()
      table.integer('type').notNullable().checkBetween([0, 5])
      table.string('image_link', 255).notNullable()
      table.integer('power').notNullable()
      table.integer('buying_price').notNullable()
      table.integer('rental_price').notNullable()
      table.timestamp('created_at')
      table.timestamp('updated_at')
    })
  }

  async down() {
    this.schema.dropTable(this.tableName)
  }
}
