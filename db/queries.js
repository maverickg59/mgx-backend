const knex = require('./knex') //the connection

module.exports = {
  getAll() {
    return knex('item')
  },
  getOne(id) {
    return knex('item')
      .where('id', id)
      .first()
  },
  create(item) {
    return knex('item').insert(item, '*')
  },
  update(id, item) {
    return knex('item')
      .where('id', id)
      .update(item, '*')
  },
  delete(id) {
    return knex('item')
      .where('id', id)
      .del()
  }
}
