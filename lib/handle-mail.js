const validateInput = require('./validate-input')
const generateMail = require('./generate-mail')
const sendMail = require('./send-mail')
const response = require('./get-response-object')

module.exports = async (context, message, handleDeadLetter = false) => {
  const { validationMatched, validationError, validationMessage } = await validateInput(context, message)
  if (validationMatched) {
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
  } else {
    if (!handleDeadLetter) {
      return response({
        message: validationMessage,
        error: validationError || ''
      }, 400)
    } else {
      throw validationError
    }
  }
}
