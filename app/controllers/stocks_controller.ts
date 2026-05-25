import type { HttpContext } from '@adonisjs/core/http'

const machine1 = {
  id: 1,
  name: 'Machine 1',
  serial_number: 1,
  type: 'Son',
  totalhours: 10,
  buyDate: '2023-01-01',
  image: '/images/machine1.jpg',
  status: 'active',
}
const machine2 = {
  id: 2,
  name: 'Machine 1',
  serial_number: 2,
  type: 'Son',
  totalhours: 5,
  buyDate: '2023-02-01',
  image: '/images/machine2.jpg',
  status: 'inactive',
}
const machine3 = {
  id: 3,
  name: 'Machine 2',
  serial_number: 1,
  type: 'Lumière',
  totalhours: 15,
  buyDate: '2023-03-01',
  image: '/images/machine3.jpg',
  status: 'active',
}

const stocks = [machine1, machine2, machine3]

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
  async store({ request, response }: HttpContext) {
    const name = request.input('name')
    const serialNumber = request.input('serial_number')
    const type = request.input('type')
    const buyDate = request.input('buyDate')
    const image = request.input('image')
    stocks.push({
      id: stocks.length + 1,
      name,
      serial_number: serialNumber,
      type,
      totalhours: 0,
      buyDate,
      image,
      status: 'inactive',
    })
    response.redirect('/stock')
  }

  /**
   * Show individual record
   */
  async show({ params, view }: HttpContext) {
    const stock = stocks.find((s) => s.id === Number.parseInt(params.id))
    return view.render('pages/stock/show', { stock })
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
  async update({ params, request, response }: HttpContext) {
    const stock = stocks.find((s) => s.id === Number.parseInt(params.id))
    if (stock) {
      stock.name = request.input('name')
      stock.serial_number = request.input('serial_number')
      stock.type = request.input('type')
      stock.buyDate = request.input('buyDate')
      stock.image = request.input('image')
    } else {
      response.status(404).send('Stock not found')
    }
    response.redirect('/stock')
  }

  /**
   * Delete record
   */
  async destroy({ params }: HttpContext) {}
}
