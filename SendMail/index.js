const validateInput = require('../lib/validate-input')
const generateMail = require('../lib/generate-mail')
const sendMail = require('../lib/send-mail')
const response = require('../lib/get-response-object')

module.exports = async function (context, req) {
  const message = req.body
  const { validationMatched, validationError, validationMessage } = await validateInput(context, message)
  if (!validationMatched) {
    return response({
      message: validationMessage,
      error: validationError || ''
    }, 400)
  }

  const mail = generateMail(message)
  try {
    await sendMail(context, mail)
    return response(mail)
  } catch (error) {
    return response({
      error: error.responseMessage || error,
      mail
    }, 500)
  }
}
