const express = require('express')

const router = express.Router()

const queries = require('../db/queries')

function isValidId(req, res, next) {
  if (!isNaN(req.params.id)) return next()
  next(new Error('Invalid ID'))
}

function validItem(item) {
  const hasCat = typeof item.category_id == 'number'
  const hasBrand = typeof item.brand == 'string' && item.brand.trim() != ''
  const hasModel = typeof item.model == 'string' && item.model.trim() != ''
  const hasCity = typeof item.city == 'string' && item.city.trim() != ''
  const hasSize = typeof item.size_id == 'number'
  const hasState = typeof item.state_id == 'number'
  const hasCond = !isNaN(item.condition_id)
  const hasPhoto = typeof item.photo_url == 'string' && item.photo_url.trim() != ''
  return hasCat && hasBrand && hasModel && hasCity && hasSize && hasState && hasCond && hasPhoto
}

router.get('/', (req, res) => {
  queries.getAll().then(items => {
    res.json(items)
  })
})

router.get('/:id', isValidId, (req, res, next) => {
  queries.getOne(req.params.id).then(item => {
    if (item) {
      res.json(item)
    } else {
      next()
    }
  })
})

router.post('/', (req, res, next) => {
  if (validItem(req.body)) {
    queries.create(req.body).then(items => {
      res.json(items[0])
    })
  } else {
    next(new Error('Invalid item!'))
  }
})

router.put('/:id', isValidId, (req, res, next) => {
  if (validItem(req.body)) {
    queries.update(req.params.id, req.body).then(items => {
      res.json(items[0])
    })
  } else {
    next(new Error('Invalid item!'))
  }
})

router.delete('/:id', isValidId, (req, res) => {
  queries.delete(req.params.id).then(() => {
    res.json({
      deleted: true
    })
  })
})

module.exports = router
