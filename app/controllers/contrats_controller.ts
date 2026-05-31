import { ContratValidator } from '#validators/contrat'
import type { HttpContext } from '@adonisjs/core/http'
import Contrat from '#models/contrat'

export default class ContratsController {
  /**
   * Display a list of resource
   */
  async index({ view }: HttpContext) {
    const contracts = await Contrat.all()
    return view.render('pages/contrat/index', { contracts })
  }

  /**
   * Display form to create a new record
   */
  async create({ view }: HttpContext) {
    return view.render('pages/contrat/create')
  }

  /**
   * Handle form submission for the create action
   */
  async store({ request, session, response }: HttpContext) {
    const data = await request.validateUsing(ContratValidator)
    await Contrat.create(data)
    session.flash('success', 'Contrat créé avec succès')
    response.redirect().toRoute('contrat.index')
  }

  /**
   * Show individual record
   */
  async show({ params, view }: HttpContext) {
    const contrat = await Contrat.find(Number.parseInt(params.id))
    return view.render('pages/contrat/show', { contrat: contrat })
  }

  /**
   * Edit individual record
   */
  async edit({ params, view }: HttpContext) {
    const contrat = await Contrat.findOrFail(params.id)
    return view.render('pages/contrat/edit', { contrat })
  }

  /**
   * Handle form submission for the edit action
   */
  async update({ params, request, session, response }: HttpContext) {
    const data = await request.validateUsing(ContratValidator)
    const contrat = await Contrat.findOrFail(params.id)
    if (contrat && data) {
      await contrat.merge(data)
      await contrat.save()
      session.flash('success', 'Le contrat a été modifié!')
      return response.redirect().toRoute('contrat.show', { id: params.id })
    } else {
      session.flash('error', 'Une erreur a été rencontrée')
      return response.redirect().back()
    }
  }

  /**
   * Delete record
   */
  async destroy({ params, session, response }: HttpContext) {
    const contract = await Contrat.findOrFail(params.id)
    contract.delete()
    session.flash('success', 'Le contrat a bien été supprimé')
    return response.redirect().toRoute('contrat.index')
  }

  async sign({ params, session, response }: HttpContext) {
    const contrat = await Contrat.findOrFail(params.id)
    contrat.isSigned = true
    await contrat.save()
    session.flash('success', 'Contrat signé avec succès')
    response.redirect().back()
  }
}
