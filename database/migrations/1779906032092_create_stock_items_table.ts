import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected tableName = 'stock_items'

  async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')
      table.integer('stock_id').unsigned().references('id').inTable('stocks').onDelete('CASCADE')
      table.integer('serial_number').notNullable()
      table.integer('hour_of_usage').notNullable()
      table.timestamp('date').notNullable().defaultTo(this.now())
      table.boolean('status').notNullable().defaultTo(false)
      table.text('note').nullable()
      table.timestamp('created_at')
      table.timestamp('updated_at')
    })
  }

  async down() {
    this.schema.dropTable(this.tableName)
  }
}
