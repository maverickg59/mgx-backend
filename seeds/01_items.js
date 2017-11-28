const items = require('../items')
exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('item')
    .del()
    .then(function() {
      // Inserts seed entries
      return knex('item').insert(items)
    })
}
