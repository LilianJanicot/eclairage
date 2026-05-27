import type { HttpContext } from '@adonisjs/core/http'
import StockType from '#enums/type'
import { StockValidator } from '#validators/stock'

const machine1 = {
  id: 1,
  name: 'Machine 1',
  type: StockType.SON,
  image_link: '/images/machine1.jpg',
}
const machine2 = {
  id: 2,
  name: 'Machine 2',
  type: StockType.SON,
  image_link: '/images/machine2.jpg',
}
const machine3 = {
  id: 3,
  name: 'Machine 3',
  type: StockType.LUMIERE,
  image_link: '/images/machine3.jpg',
}

const stocks = [machine1, machine2, machine3]

const stockItem1 = {
  id: 1,
  machine_id: 1,
  serial_number: 1,
  hour_of_usage: 10,
  buying_date: new Date().toISOString(),
  status: false,
  note: '',
}

const stockItem2 = {
  id: 2,
  machine_id: 1,
  serial_number: 2,
  hour_of_usage: 5,
  buying_date: new Date().toISOString(),
  status: true,
  note: 'Note de test',
}

const stockItem3 = {
  id: 3,
  machine_id: 2,
  serial_number: 1,
  hour_of_usage: 15,
  buying_date: new Date().toISOString(),
  status: false,
  note: '',
}

const stockItems = [stockItem1, stockItem2, stockItem3]

export default class StocksController {
  /**
   * Display a list of resource
   */
  async index({ view }: HttpContext) {
    return view.render('pages/stock/index', { stocks })
  }

  /**
   * Display form to create a new record
   */
  async create({ view }: HttpContext) {
    return view.render('pages/stock/create')
  }

  /**
   * Handle form submission for the create action
   */
  async store({ request, response, session }: HttpContext) {
    const data = await request.validateUsing(StockValidator)
    stocks.push({
      id: stocks.length + 1,
      name: data.name,
      type: data.type,
      image_link: 'myLink',
    })
    session.flash('success', `${data.name} a bien été créé`)
    response.redirect().toRoute('stock.index')
  }

  /**
   * Show individual record
   */
  async show({ params, view }: HttpContext) {
    const stock = stocks.find((s) => s.id === Number.parseInt(params.id))
    const stockItemsdata = stockItems.filter((item) => item.machine_id === stock?.id)
    return view.render('pages/stock/show', { stock, stockItemsdata })
  }

  /**
   * Edit individual record
   */
  async edit({ params, view }: HttpContext) {
    const stock = stocks.find((s) => s.id === Number.parseInt(params.id))
    return view.render('pages/stock/edit', { stock })
  }

  /**
   * Handle form submission for the edit action
   */
  async update({ params, request, response, session }: HttpContext) {
    const stock = stocks.find((s) => s.id === Number.parseInt(params.id))
    const data = await request.validateUsing(StockValidator)
    if (stock && data) {
      stock.name = data.name
      stock.type = data.type
      stock.image_link = 'imageLink'
      session.flash('success', `${stock.name} a bien été modifié`)
    } else {
      response.status(404).send('Stock non trouvé')
    }
    response.redirect().toRoute('stock.index')
  }

  /**
   * Delete record
   */
  async destroy({ params }: HttpContext) {}
}
