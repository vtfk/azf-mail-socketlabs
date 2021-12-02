const barhandles = require('barhandles')
const { readdirSync } = require('fs')
const path = require('path')

const dirPath = `${__dirname}/../lib/templates`

module.exports = async function (context, req) {
  const { template } = req.params
  const templates = []

  if (!template) {
    return {
      status: 400,
      body: 'Template name missing in the url'
    }
  }

  readdirSync(dirPath).forEach(fileName => {
    const templateBody = require(`${dirPath}/${fileName}`)()
    const fileNameWithoutExtension = fileName.replace(path.extname(fileName), '')

    if ((template.toLowerCase() === 'all') || (template.toLowerCase() === fileNameWithoutExtension.toLowerCase())) {
      templates.push({
        name: fileNameWithoutExtension,
        schema: barhandles.extractSchema(templateBody)
      })
    }
  })

  if (templates.length > 0) {
    return {
      status: 200,
      body: (templates.length === 1 ? templates[0] : templates)
    }
  } else {
    return {
      status: 404,
      body: 'No templates found...'
    }
  }
}
