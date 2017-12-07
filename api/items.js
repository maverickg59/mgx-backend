const express = require('express')
const router = express.Router()
const queries = require('../db/queries')
const skipperS3 = require('skipper-s3')
const fs = require('fs');

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
  const hasBool = typeof item.featured == 'boolean'
  return (
    hasCat &&
    hasBrand &&
    hasModel &&
    hasCity &&
    hasSize &&
    hasState &&
    hasCond &&
    hasPhoto &&
    hasBool
  )
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

router.put('/upload', (req, res, next) => {
  req.file('file')
    .upload({
      // Required
      adapter: skipperS3,
      key: 'AKIAILRSW7JDKJAWIAXQ',
      secret: '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',
      bucket: 'mgx-photos',
    }, function whenDone(err, uploadedFiles) {
      if (err) return next(err);
      console.log('uploadedFiles', uploadedFiles)
      return res.status(200).send(uploadedFiles);
    })
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
