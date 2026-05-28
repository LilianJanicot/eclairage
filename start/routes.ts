/*
|--------------------------------------------------------------------------
| Routes file
|--------------------------------------------------------------------------
|
| The routes file is used for defining the HTTP routes.
|
*/

import { middleware } from '#start/kernel'
import { controllers } from '#generated/controllers'
import router from '@adonisjs/core/services/router'

router.on('/').render('pages/home').as('home')

router.resource('stock', controllers.Stocks)
router
  .group(() => {
    router
      .get('stock-items/:serial_number', [controllers.StockItems, 'show'])
      .as('stock-items.show')
    router.post('stock-items', [controllers.StockItems, 'store']).as('stock-items.store')
    router
      .put('stock-items/:serial_number', [controllers.StockItems, 'update'])
      .as('stock-items.update')
    router
      .delete('stock-items/:serial_number', [controllers.StockItems, 'destroy'])
      .as('stock-items.destroy')
  })
  .prefix('/stock/:stock_id')

router
  .group(() => {
    router.get('signup', [controllers.NewAccount, 'create'])
    router.post('signup', [controllers.NewAccount, 'store'])

    router.get('login', [controllers.Session, 'create'])
    router.post('login', [controllers.Session, 'store'])
  })
  .use(middleware.guest())

router
  .group(() => {
    router.post('logout', [controllers.Session, 'destroy'])
  })
  .use(middleware.auth())
