import '@adonisjs/core/types/http'

type ParamValue = string | number | bigint | boolean

export type ScannedRoutes = {
  ALL: {
    'home': { paramsTuple?: []; params?: {} }
    'stock.index': { paramsTuple?: []; params?: {} }
    'stock.create': { paramsTuple?: []; params?: {} }
    'stock.store': { paramsTuple?: []; params?: {} }
    'stock.show': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'stock.edit': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'stock.update': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'stock.destroy': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'stock_items.store': { paramsTuple: [ParamValue]; params: {'stock_id': ParamValue} }
    'new_account.create': { paramsTuple?: []; params?: {} }
    'new_account.store': { paramsTuple?: []; params?: {} }
    'session.create': { paramsTuple?: []; params?: {} }
    'session.store': { paramsTuple?: []; params?: {} }
    'session.destroy': { paramsTuple?: []; params?: {} }
  }
  GET: {
    'home': { paramsTuple?: []; params?: {} }
    'stock.index': { paramsTuple?: []; params?: {} }
    'stock.create': { paramsTuple?: []; params?: {} }
    'stock.show': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'stock.edit': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'new_account.create': { paramsTuple?: []; params?: {} }
    'session.create': { paramsTuple?: []; params?: {} }
  }
  HEAD: {
    'home': { paramsTuple?: []; params?: {} }
    'stock.index': { paramsTuple?: []; params?: {} }
    'stock.create': { paramsTuple?: []; params?: {} }
    'stock.show': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'stock.edit': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'new_account.create': { paramsTuple?: []; params?: {} }
    'session.create': { paramsTuple?: []; params?: {} }
  }
  POST: {
    'stock.store': { paramsTuple?: []; params?: {} }
    'stock_items.store': { paramsTuple: [ParamValue]; params: {'stock_id': ParamValue} }
    'new_account.store': { paramsTuple?: []; params?: {} }
    'session.store': { paramsTuple?: []; params?: {} }
    'session.destroy': { paramsTuple?: []; params?: {} }
  }
  PUT: {
    'stock.update': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
  }
  PATCH: {
    'stock.update': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
  }
  DELETE: {
    'stock.destroy': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
  }
}
declare module '@adonisjs/core/types/http' {
  export interface RoutesList extends ScannedRoutes {}
}