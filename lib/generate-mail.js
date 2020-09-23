const classHandling = require('./socketlabs-class-handling');
const compileBody = require('./compile-body');

module.exports = (params) => {
    let body;
    if (params.template && params.template.templateName && params.template.templateData) {
        // generate mail body with builtin template and data
        body = compileBody.fromTemplateName(params.template.templateName, params.template.templateData);
    }
    else if (params.template && params.template.template && params.template.templateData) {
        // generate mail body with raw template and data
        body = compileBody.fromRawTemplate(params.template.template, params.template.templateData);
    }

    return {
        to: params.to,
        from: classHandling.fromAddress(params.from),
        replyTo: classHandling.replyToAddress(params.replyTo, params.from),
        subject: params.subject,
        cc: params.cc || [],
        bcc: params.bcc || [],
        textBody: params.text || undefined,
        htmlBody: body || params.html || undefined,
        attachments: classHandling.getAttachments(params.attachments),
        messageType: 'basic',
        charSet: 'utf8'
    }
}