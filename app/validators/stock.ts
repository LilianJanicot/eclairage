import vine from '@vinejs/vine'

export const StockValidator = vine.create({
  name: vine.string(),
  type: vine.string().in(['lumiere', 'son', 'consommable', 'structure', 'energie', 'video']),
  image: vine.file({ extnames: ['jpg', 'png', 'jpeg'] }),
})
