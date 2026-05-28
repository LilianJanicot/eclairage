import type { HttpContext } from '@adonisjs/core/http'
import { StockValidator } from '#validators/stock'
import Stock from '#models/stock'
import StockItem from '#models/stock_item'

export default class StocksController {
  /**
   * Display a list of resource
   */
  async index({ view }: HttpContext) {
    const stocks = await Stock.all()
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
    const stock = new Stock()
    stock.name = data.name
    stock.type = data.type
    stock.power = data.power ?? 0
    stock.buyingPrice = data.buying_price
    stock.rentalPrice = data.rental_price
    stock.imageLink = 'myLink'
    await stock.save()
    session.flash('success', `${data.name} a bien été créé`)
    response.redirect().toRoute('stock.index')
  }

  /**
   * Show individual record
   */
  async show({ params, view }: HttpContext) {
    const stock = await Stock.findOrFail(params.id)
    const stockItems = await StockItem.query().where('stock_id', params.id)
    return view.render('pages/stock/show', { stock, stockItems })
  }

  /**
   * Edit individual record
   */
  async edit({ params, view }: HttpContext) {
    const stock = await Stock.findOrFail(params.id)
    return view.render('pages/stock/edit', { stock })
  }

  /**
   * Handle form submission for the edit action
   */
  async update({ params, request, response, session }: HttpContext) {
    const stock = await Stock.findOrFail(params.id)
    const data = await request.validateUsing(StockValidator)
    if (stock && data) {
      stock.name = data.name
      stock.type = data.type
      stock.imageLink = 'imageLink'
      stock.power = data.power ?? 0
      stock.buyingPrice = data.buying_price
      stock.rentalPrice = data.rental_price
      session.flash('success', `${stock.name} a bien été modifié`)
      await stock.save()
    } else {
      response.status(404).send('Stock non trouvé')
    }
    response.redirect().toRoute('stock.index')
  }

  /**
   * Delete record
   */
  async destroy({ params, response, session }: HttpContext) {
    const stock = await Stock.findOrFail(params.id)
    stock.delete()
    session.flash('success', `${stock.name} a bien été supprimé`)
    response.redirect().toRoute('stock.index')
  }
}
