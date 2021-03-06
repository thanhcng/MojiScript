const signature = require('../_internal/debug/signature')
const call = require('../_internal/call')
const reduceWhile = require('./reduceWhile')

const asyncFilterReducer = func => acc => x => call(val => (val && acc.push(x), acc))(func(x))

// filter :: Function -> Filterable -> Array
const filter = predicate => iterable =>
  reduceWhile (null) (asyncFilterReducer (predicate)) ([]) (iterable) // eslint-disable-line

module.exports = filter

// Experimental debug code
/* istanbul ignore next */
if (process.env.MOJI_DEBUG === 'true') {
  module.exports = signature('filter :: Function -> Filterable -> Array')(filter)
}
