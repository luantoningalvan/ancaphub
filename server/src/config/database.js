var mongoose = require('mongoose');
mongoose.Promise = global.Promise;

module.exports = mongoose.connect("mongodb://localhost/ancaphub", {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false
})