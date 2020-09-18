const handleMail = require('../lib/handle-mail');

module.exports = async function (context, req) {
    context.log('JavaScript HTTP trigger function processed a request.');

    context.res = await handleMail(context, req.body);
}