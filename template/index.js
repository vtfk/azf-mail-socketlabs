const barhandles = require('barhandles')
const { readdirSync } = require('fs')
const { extname, join } = require('path')
const response = require('../lib/get-response-object')

const getTemplates = () => {
  const dirPath = join(__dirname, '/../lib/templates')

  return readdirSync(dirPath).map(fileName => {
    const templateBody = require(`${dirPath}/${fileName}`)()
    const name = fileName.replace(extname(fileName), '')
    return {
      name,
      schema: barhandles.extractSchema(templateBody)
    }
  })
}

module.exports = async function (context, req) {
  const { template } = req.params
  if (!template) {
    return response('Template name missing in the url', 400)
  }

  const templateName = template.toLowerCase()
  const templates = getTemplates().filter(t => templateName === 'all' || templateName === t.name.toLowerCase())

  if (templates.length === 1) return response(templates[0])
  else if (templates.length > 1) return response(templates)
  else {
    return response({
      error: 'No templates found...'
    }, 404)
  }
}
