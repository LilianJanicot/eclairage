import vine from '@vinejs/vine'

export const ContratValidator = vine.create({
  client: vine.string(),
  name_contract: vine.string(),
  client_adress: vine.string(),
  name_event: vine.string(),
  begin: vine.date({ formats: ['iso8601'] }).after('today'),
  end: vine.date({ formats: ['iso8601'] }).afterField('begin'),
  contact: vine.string(),
  mission: vine.string(),
})
