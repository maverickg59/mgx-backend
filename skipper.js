req.file('node').upload({
  // ...any other options here...
  adapter: require('skipper-s3'),
  key: 'AKIAILRSW7JDKJAWIAXQ',
  secret: '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',
  bucket: 'mgx-photos',
})
