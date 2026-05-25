import type { HttpContext } from '@adonisjs/core/http'

const machine1 = {
  id: 1,
  name: 'Machine 1',
  type: 'Son',
  image_link: '/images/machine1.jpg',
}
const machine2 = {
  id: 2,
  name: 'Machine 2',
  type: 'Son',
  image_link: '/images/machine2.jpg',
}
const machine3 = {
  id: 3,
  name: 'Machine 3',
  type: 'Lumière',
  image_link: '/images/machine3.jpg',
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
    const type = request.input('type')
    const image = request.file('image')
    stocks.push({
      id: stocks.length + 1,
      name,
      type,
      image_link: 'imageLink',
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
      stock.type = request.input('type')
      stock.image_link = 'imageLink'
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
