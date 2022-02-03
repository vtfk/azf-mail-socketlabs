const Ajv = require('ajv')
const addAjvFormats = require('ajv-formats')
const addBase64Format = require('ajv-base64')
const validationSchema = require('./schemas/mail.json')
const getTemplate = require('./get-template')
const compileBody = require('./compile-body')

const getValidationErrors = errors => {
  return errors.map(err => {
    let error = {
      message: err.message
    }

    if (err.instancePath) {
      error = {
        property: err.instancePath.indexOf('/') === 0 ? err.instancePath.slice(1) : err.instancePath,
        ...error
      }
    }

    return error
  })
}

module.exports = (context, body) => {
  const ajv = new Ajv()
  addAjvFormats(ajv)
  addBase64Format(ajv)
  const validate = ajv.compile(validationSchema)
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

      if (template === undefined) {
        return {
          validationMatched: false,
          validationError: 'Template is invalid',
          validationMessage: errorMsg
        }
      }
    } else if (body.template && body.template.templateName) {
      const template = getTemplate(body.template.templateName)

      if (template === '') {
        return {
          validationMatched: false,
          validationError: 'Template name not found',
          validationMessage: errorMsg
        }
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

    const validationMatched = validate(body)
    const validationError = Array.isArray(validate.errors) ? getValidationErrors(validate.errors) : undefined
    const validationMessage = Array.isArray(validate.errors) ? errorMsg : undefined
    return {
      validationMatched,
      validationError,
      validationMessage
    }
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
