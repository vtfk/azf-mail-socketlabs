const { Validator } = require('node-input-validator')
const validationTemplate = require('./schemas/inputs.json')
const getTemplate = require('./get-template')
const compileBody = require('./compile-body')

module.exports = (context, body) => {
  const v = new Validator(body, validationTemplate)
  const errorMsg = 'One or more fields are invalid or missing'

  if (body.template && body.text) {
    const validationError = 'template and text can not be specified together.'
    context.log(errorMsg, validationError)

    return {
      validationMatched: false,
      validationError,
      validationMessage: errorMsg
    }
  } else if (body.text || body.html || body.template) {
    if (body.template && body.template.template) {
      let template
      try {
        template = compileBody.fromRawTemplate(body.template.template)
      } catch {
        template = undefined
      }

      return {
        validationMatched: (template !== undefined),
        validationError: (template !== undefined ? undefined : 'Template is invalid'),
        validationMessage: (template !== undefined ? undefined : errorMsg)
      }
    } else if (body.template && body.template.templateName) {
      const template = getTemplate(body.template.templateName)

      return {
        validationMatched: (template !== ''),
        validationError: (template !== '' ? undefined : 'Template name not found'),
        validationMessage: (template !== '' ? undefined : errorMsg)
      }
    } else if (body.template && !body.template.template && !body.template.templateName) {
      const validationError = 'Missing templateName or template'
      context.log(errorMsg, validationError)

      return {
        validationMatched: false,
        validationError,
        validationMessage: errorMsg
      }
    }

    return v.check().then((validationMatched) => {
      const result = { validationMatched, validationError: undefined, validationMessage: undefined }

      if (!validationMatched) {
        context.log(errorMsg, v.errors)
        result.validationError = v.errors
        result.validationMessage = errorMsg
      }

      return result
    })
  } else {
    const validationError = 'Missing text, html or template'
    context.log(errorMsg, validationError)

    return {
      validationMatched: false,
      validationError,
      validationMessage: errorMsg
    }
  }
}
