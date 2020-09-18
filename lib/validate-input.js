const { Validator } = require('node-input-validator');
const validationTemplate = require('./inputs.json');

module.exports = (body) => {
    const v = new Validator(body, validationTemplate);
    let errorMsg = "One or more fields are invalid or missing"

    if (body.templateId && body.text) {
        let validationError = "templateId and text can not be specified together."
        console.log(errorMsg, validationError);

        return {
            validationMatched: false,
            validationError,
            validationMessage: errorMsg
        };
    }
    else if (body.text || body.html || body.templateId) {
        return v.check().then((validationMatched) => {
            let result = { validationMatched, validationError: undefined, validationMessage: undefined }

            if (!validationMatched) {
                console.log(errorMsg, v.errors);
                result.validationError = v.errors
                result.validationMessage = errorMsg
            }

            return result;
        });
    }
    else {
        let validationError = "Missing text, html or templateId"
        console.log(errorMsg, validationError);

        return {
            validationMatched: false,
            validationError,
            validationMessage: errorMsg
        };
    }
}  