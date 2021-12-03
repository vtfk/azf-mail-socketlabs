const { compile } = require('handlebars')
const getTemplate = require('./get-template')

module.exports.fromRawTemplate = (raw, data) => {
  return compile(raw)(data)
}

module.exports.fromTemplateName = (name, data) => {
  return compile(getTemplate(name))(data)
}
