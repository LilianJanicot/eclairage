import type { HttpContext } from '@adonisjs/core/http'
import { DateTime } from 'luxon'

const stockItem1 = {
  id: 1,
  machine_id: 1,
  serial_number: 1,
  hour_of_usage: 10,
  buying_date: DateTime.now().toISO(),
  status: false,
  note: '',
}

const stockItem2 = {
  id: 2,
  machine_id: 1,
  serial_number: 2,
  hour_of_usage: 5,
  buying_date: DateTime.now().toISO(),
  status: true,
  note: 'Note de test',
}

const stockItem3 = {
  id: 3,
  machine_id: 2,
  serial_number: 1,
  hour_of_usage: 15,
  buying_date: DateTime.now().toISO(),
  status: false,
  note: '',
}

const stockItems = [stockItem1, stockItem2, stockItem3]

export default class StockItemsController {
  /**
   * Handle form submission for the create action
   */
  async store({ params, response }: HttpContext) {
    const lastSerialNumber = stockItems.filter(
      (item) => item.machine_id === Number(params.stock_id)
    ).length
    const data = {
      id: stockItems.length + 1,
      machine_id: Number(params.stock_id),
      serial_number: lastSerialNumber + 1,
      hour_of_usage: 0,
      buying_date: DateTime.now().toISO(),
      status: false,
      note: '',
    }
    stockItems.push(data)
    response.redirect().toRoute('stock.show', { id: params.stock_id })
  }

  /**
   * Show individual record
   */
  async show({ params }: HttpContext) {}

  /**
   * Edit individual record
   */
  async edit({ params }: HttpContext) {}

  /**
   * Handle form submission for the edit action
   */
  async update({ params, request }: HttpContext) {}

  /**
   * Delete record
   */
  async destroy({ params }: HttpContext) {}
}
