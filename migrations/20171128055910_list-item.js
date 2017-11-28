exports.up = function(knex, Promise) {
  return knex.schema.createTable('item', table => {
    table.increments()
    table.integer('category_id')
    table.text('brand')
    table.text('model')
    table.text('city')
    table.integer('size_id')
    table.integer('state_id')
    table.integer('condition_id')
    table.text('photo_url')
    table.boolean('featured')
  })
}

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('item')
}
