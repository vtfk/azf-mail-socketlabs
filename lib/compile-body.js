const handlebars = require('handlebars');
const getTemplate = require('./get-template');

module.exports.fromRawTemplate = (raw, data) => {
    return handlebars.compile(raw)(data);
}

module.exports.fromTemplateName = (name, data) => {
    return handlebars.compile(getTemplate(name))(data);
}