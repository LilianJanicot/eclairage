import { StockSchema } from '#database/schema'
import { hasMany } from '@adonisjs/lucid/orm'
import type { HasMany } from '@adonisjs/lucid/types/relations'
import StockItem from '#models/stock_item'

export default class Stock extends StockSchema {
  @hasMany(() => StockItem)
  declare stockItems: HasMany<typeof StockItem>
}
