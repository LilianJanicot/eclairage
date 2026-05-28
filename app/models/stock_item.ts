import { StockItemSchema } from '#database/schema'
import { belongsTo } from '@adonisjs/lucid/orm'
import type { BelongsTo } from '@adonisjs/lucid/types/relations'
import Stock from '#models/stock'

export default class StockItem extends StockItemSchema {
  @belongsTo(() => Stock)
  declare stock: BelongsTo<typeof Stock>
}
