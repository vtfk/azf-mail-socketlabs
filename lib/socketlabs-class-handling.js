const { EmailAddress } = require('@socketlabs/email')
const { Attachment } = require('@socketlabs/email/src/message/messageClasses')

module.exports.fromAddress = (from) => {
  if (from.indexOf('<') > -1) {
    const fromSplit = from.split('<')
    const friendlyName = fromSplit[0].trim()
    const address = fromSplit[1].replace('>', '').trim()

    return new EmailAddress(address, { friendlyName })
  } else return from
}

module.exports.replyToAddress = (replyTo, from) => {
  if (replyTo) return new EmailAddress(replyTo)
  else {
    const address = this.fromAddress(from)
    return (typeof address === 'string' ? new EmailAddress(address) : address)
  }
}

module.exports.getAttachments = (attachments) => {
  if (!attachments) return []
  else {
    return attachments.map(attachment => {
      return new Attachment({
        name: attachment.filename,
        contentType: attachment.type,
        content: attachment.content
      })
    })
  }
}
