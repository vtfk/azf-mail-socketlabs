const handleMail = require('../lib/handle-mail')

module.exports = async function (context, req) {
  return await handleMail(context, req.body)
}
