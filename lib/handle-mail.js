const validateInput = require('../lib/validate-input');
const generateMail = require('../lib/generate-mail');
const sendMail = require('../lib/send-mail');

module.exports = async (context, message, handleDeadLetter = false) => {
    const { validationMatched, validationError, validationMessage } = await validateInput(context, message);
    if (validationMatched) {
        let mail = generateMail(message);
        try {
            await sendMail(context, mail);
            return { body: mail };
        }
        catch (error) {
            return {
                status: 500,
                body: {
                    error,
                    mail
                }
            };
        }
    }
    else {
        if (!handleDeadLetter) {
            return {
                status: 400,
                body: {
                    message: validationMessage,
                    error: validationError || ''
                }
            };
        }
        else {
            throw validationError;
        }
    }
}