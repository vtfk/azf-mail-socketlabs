const barhandles = require('barhandles')
const { readdirSync } = require('fs')
const { extname, join } = require('path')
const response = require('../lib/get-response-object')

const dirPath = join(__dirname, '/../lib/templates')

module.exports = async function (context, req) {
  const { template } = req.params
  const templates = []

  if (!template) {
    return response('Template name missing in the url', 400)
  }

  readdirSync(dirPath).forEach(fileName => {
    const templateBody = require(`${dirPath}/${fileName}`)()
    const fileNameWithoutExtension = fileName.replace(extname(fileName), '')

    if ((template.toLowerCase() === 'all') || (template.toLowerCase() === fileNameWithoutExtension.toLowerCase())) {
      templates.push({
        name: fileNameWithoutExtension,
        schema: barhandles.extractSchema(templateBody)
      })
    }
  })

  if (templates.length > 0) return response((templates.length === 1 ? templates[0] : templates))
  else {
    return response({
      error: 'No templates found...'
    }, 404)
  }
}
