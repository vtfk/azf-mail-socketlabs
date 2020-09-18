const classHandling = require('./socketlabs-class-handling');

module.exports = (params) => {
    return {
        to: params.to,
        from: classHandling.fromAddress(params.from),
        replyTo: classHandling.replyToAddress(params.replyTo, params.from),
        subject: params.subject,
        cc: params.cc || [],
        bcc: params.bcc || [],
        textBody: params.text || undefined,
        htmlBody: params.html || undefined,
        attachments: classHandling.getAttachments(params.attachments),
        messageType: 'basic',
        charSet: 'utf8'
    }
}