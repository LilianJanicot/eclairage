import vine from '@vinejs/vine'

export const StockValidator = vine.create({
  name: vine.string(),
  type: vine.enum(['0', '1', '2', '3', '4', '5']).transform((value) => Number(value)),
  image: vine.file({ extnames: ['jpg', 'png', 'jpeg'], size: '5mb' }),
  power: vine.number().min(0).optional(),
  buying_price: vine.number().min(0),
  rental_price: vine.number().min(0),
})

export const StockItemValidator = vine.create({
  note: vine.string().maxLength(500).optional(),
})
