const Book = require('./book')
const errorHandler = require('../common/errorHandler')

Book.methods(['get', 'post', 'put', 'delete'])
Book.updateOptions({new: true, runValidators: true})
Book.after('post', errorHandler).after('put', errorHandler)

module.exports = Book