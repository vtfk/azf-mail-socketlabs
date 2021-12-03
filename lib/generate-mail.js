const { fromAddress, replyToAddress, getAttachments } = require('./socketlabs-class-handling')
const { fromTemplateName, fromRawTemplate } = require('./compile-body')

module.exports = params => {
  const { template, to, from, replyTo, subject, cc, bcc, text, html, attachments } = params
  let body
  if (template && template.templateName && template.templateData) {
    // generate mail body with builtin template and data
    body = fromTemplateName(template.templateName, template.templateData)
  } else if (template && template.template && template.templateData) {
    // generate mail body with raw template and data
    body = fromRawTemplate(template.template, template.templateData)
  }

  return {
    to: to,
    from: fromAddress(from),
    replyTo: replyToAddress(replyTo, from),
    subject: subject,
    cc: cc || [],
    bcc: bcc || [],
    textBody: text || undefined,
    htmlBody: body || html || undefined,
    attachments: getAttachments(attachments),
    messageType: 'basic',
    charSet: 'utf8'
  }
}
