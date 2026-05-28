import type { HttpContext } from '@adonisjs/core/http'
import StockItem from '#models/stock_item'
import { StockItemValidator } from '#validators/stock'

export default class StockItemsController {
  /**
   * Handle form submission for the create action
   */
  async store({ params, response, session }: HttpContext) {
    const lastSerialNumber = await StockItem.query()
      .where('stock_id', params.stock_id)
      .max('serial_number')
      .firstOrFail()
    const serialNumber = (lastSerialNumber.$extras.max ?? 0) + 1
    const data = {
      stock_id: Number(params.stock_id),
      serial_number: serialNumber,
      hour_of_usage: 0,
      status: false,
      note: '',
    }
    await StockItem.create(data)
    session.flash('success', `L'item a bien été créé`)
    response.redirect().toRoute('stock.show', { id: params.stock_id })
  }

  /**
   * Show individual record
   */
  async show({ params, view }: HttpContext) {
    const stockItem = await StockItem.query()
      .where('serial_number', params.serial_number)
      .andWhere('stock_id', params.stock_id)
      .firstOrFail()
    return view.render('pages/stock/item/show', { stockItem })
  }

  /**
   * Handle form submission for the edit action
   */
  async update({ params, request, session, response }: HttpContext) {
    const stockItem = await StockItem.query()
      .where('serial_number', params.serial_number)
      .andWhere('stock_id', params.stock_id)
      .firstOrFail()
    const data = await request.validateUsing(StockItemValidator)
    await stockItem.merge(data).save()
    session.flash('success', `L'item ${stockItem.serialNumber} a bien été mis à jour`)
    return response.redirect().toRoute('stock-items.show', {
      stock_id: params.stock_id,
      serial_number: params.serial_number,
    })
  }

  /**
   * Delete record
   */
  async destroy({ params, session, response }: HttpContext) {
    const stockItem = await StockItem.query()
      .where('serial_number', params.serial_number)
      .andWhere('stock_id', params.stock_id)
      .firstOrFail()
    await stockItem.delete()
    session.flash('success', `L'item ${stockItem.serialNumber} a bien été supprimé`)
    return response.redirect().toRoute('stock.show', { id: params.stock_id })
  }
}
