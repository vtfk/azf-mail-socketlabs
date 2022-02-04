const validate = require('../lib/validate-input')

const mockedContext = {
  log: jest.fn()
}

const templatePaylod = {
  to: [
    'to@example.com'
  ],
  from: 'from@example.com',
  subject: 'Hello there',
  template: {
    templateName: 'vtfk',
    templateData: {
      body: '<b>This is a test<b>',
      signature: {
        company: 'Test'
      }
    }
  }
}

const validationMsg = 'One or more fields are invalid or missing'

describe('Validation fails when "to"', () => {
  test('Is missing', () => {
    const invalid = JSON.parse(JSON.stringify(templatePaylod))
    delete invalid.to

    const { validationMatched, validationError, validationMessage } = validate(mockedContext, invalid)
    expect(validationMatched).toBe(false)
    expect(validationError.filter(err => err.message === 'must have required property \'to\'').length).toBe(1)
    expect(validationMessage).toBe(validationMsg)
  })

  test('Is not an array', () => {
    const invalid = JSON.parse(JSON.stringify(templatePaylod))
    invalid.to = 'to@example.com'

    const { validationMatched, validationError, validationMessage } = validate(mockedContext, invalid)
    expect(validationMatched).toBe(false)
    expect(validationError.filter(err => err.message === 'must be array' && err.property === 'to').length).toBe(1)
    expect(validationMessage).toBe(validationMsg)
  })

  test('Is an empty array', () => {
    const invalid = JSON.parse(JSON.stringify(templatePaylod))
    invalid.to = []

    const { validationMatched, validationError, validationMessage } = validate(mockedContext, invalid)
    expect(validationMatched).toBe(false)
    expect(validationError.filter(err => err.message === 'must NOT have fewer than 1 items' && err.property === 'to').length).toBe(1)
    expect(validationMessage).toBe(validationMsg)
  })

  test('Has duplicate items', () => {
    const invalid = JSON.parse(JSON.stringify(templatePaylod))
    invalid.to.push('to@example.com')

    const { validationMatched, validationError, validationMessage } = validate(mockedContext, invalid)
    expect(validationMatched).toBe(false)
    expect(validationError.filter(err => err.message.includes('must NOT have duplicate items') && err.property === 'to').length).toBe(1)
    expect(validationMessage).toBe(validationMsg)
  })

  test('Has an item which is not in email format', () => {
    const invalid = JSON.parse(JSON.stringify(templatePaylod))
    invalid.to.push('to_at_example.com')

    const { validationMatched, validationError, validationMessage } = validate(mockedContext, invalid)
    expect(validationMatched).toBe(false)
    expect(validationError.filter(err => err.message.includes('must match format "email"') && err.property === 'to/1').length).toBe(1)
    expect(validationMessage).toBe(validationMsg)
  })
})

describe('Validation fails when "cc"', () => {
  test('Is not an array', () => {
    const invalid = JSON.parse(JSON.stringify(templatePaylod))
    invalid.cc = 'cc@example.com'

    const { validationMatched, validationError, validationMessage } = validate(mockedContext, invalid)
    expect(validationMatched).toBe(false)
    expect(validationError.filter(err => err.message === 'must be array' && err.property === 'cc').length).toBe(1)
    expect(validationMessage).toBe(validationMsg)
  })

  test('Is an empty array', () => {
    const invalid = JSON.parse(JSON.stringify(templatePaylod))
    invalid.cc = []

    const { validationMatched, validationError, validationMessage } = validate(mockedContext, invalid)
    expect(validationMatched).toBe(false)
    expect(validationError.filter(err => err.message === 'must NOT have fewer than 1 items' && err.property === 'cc').length).toBe(1)
    expect(validationMessage).toBe(validationMsg)
  })

  test('Has duplicate items', () => {
    const invalid = JSON.parse(JSON.stringify(templatePaylod))
    invalid.cc = ['cc@example.com', 'cc@example.com']

    const { validationMatched, validationError, validationMessage } = validate(mockedContext, invalid)
    expect(validationMatched).toBe(false)
    expect(validationError.filter(err => err.message.includes('must NOT have duplicate items') && err.property === 'cc').length).toBe(1)
    expect(validationMessage).toBe(validationMsg)
  })

  test('Has an item which is not in email format', () => {
    const invalid = JSON.parse(JSON.stringify(templatePaylod))
    invalid.cc = ['cc@example.com', 'cc_at_example.com']

    const { validationMatched, validationError, validationMessage } = validate(mockedContext, invalid)
    expect(validationMatched).toBe(false)
    expect(validationError.filter(err => err.message.includes('must match format "email"') && err.property === 'cc/1').length).toBe(1)
    expect(validationMessage).toBe(validationMsg)
  })
})

describe('Validation fails when "bcc"', () => {
  test('Is not an array', () => {
    const invalid = JSON.parse(JSON.stringify(templatePaylod))
    invalid.bcc = 'bcc@example.com'

    const { validationMatched, validationError, validationMessage } = validate(mockedContext, invalid)
    expect(validationMatched).toBe(false)
    expect(validationError.filter(err => err.message === 'must be array' && err.property === 'bcc').length).toBe(1)
    expect(validationMessage).toBe(validationMsg)
  })

  test('Is an empty array', () => {
    const invalid = JSON.parse(JSON.stringify(templatePaylod))
    invalid.bcc = []

    const { validationMatched, validationError, validationMessage } = validate(mockedContext, invalid)
    expect(validationMatched).toBe(false)
    expect(validationError.filter(err => err.message === 'must NOT have fewer than 1 items' && err.property === 'bcc').length).toBe(1)
    expect(validationMessage).toBe(validationMsg)
  })

  test('Has duplicate items', () => {
    const invalid = JSON.parse(JSON.stringify(templatePaylod))
    invalid.bcc = ['bcc@example.com', 'bcc@example.com']

    const { validationMatched, validationError, validationMessage } = validate(mockedContext, invalid)
    expect(validationMatched).toBe(false)
    expect(validationError.filter(err => err.message.includes('must NOT have duplicate items') && err.property === 'bcc').length).toBe(1)
    expect(validationMessage).toBe(validationMsg)
  })

  test('Has an item which is not in email format', () => {
    const invalid = JSON.parse(JSON.stringify(templatePaylod))
    invalid.bcc = ['bcc@example.com', 'bcc_at_example.com']

    const { validationMatched, validationError, validationMessage } = validate(mockedContext, invalid)
    expect(validationMatched).toBe(false)
    expect(validationError.filter(err => err.message.includes('must match format "email"') && err.property === 'bcc/1').length).toBe(1)
    expect(validationMessage).toBe(validationMsg)
  })
})

describe('Validation fails when', () => {
  test('"from" is missing', () => {
    const invalid = JSON.parse(JSON.stringify(templatePaylod))
    delete invalid.from

    const { validationMatched, validationError, validationMessage } = validate(mockedContext, invalid)
    expect(validationMatched).toBe(false)
    expect(validationError.filter(err => err.message === 'must have required property \'from\'').length).toBe(1)
    expect(validationMessage).toBe(validationMsg)
  })

  test('"from" is not a string', () => {
    const invalid = JSON.parse(JSON.stringify(templatePaylod))
    invalid.from = ['bcc@example.com']

    const { validationMatched, validationError, validationMessage } = validate(mockedContext, invalid)
    expect(validationMatched).toBe(false)
    expect(validationError.filter(err => err.message === 'must be string' && err.property === 'from').length).toBe(1)
    expect(validationMessage).toBe(validationMsg)
  })

  test('"replyTo" is not a string', () => {
    const invalid = JSON.parse(JSON.stringify(templatePaylod))
    invalid.replyTo = ['bcc@example.com']

    const { validationMatched, validationError, validationMessage } = validate(mockedContext, invalid)
    expect(validationMatched).toBe(false)
    expect(validationError.filter(err => err.message === 'must be string' && err.property === 'replyTo').length).toBe(1)
    expect(validationMessage).toBe(validationMsg)
  })

  test('"subject" is missing', () => {
    const invalid = JSON.parse(JSON.stringify(templatePaylod))
    delete invalid.subject

    const { validationMatched, validationError, validationMessage } = validate(mockedContext, invalid)
    expect(validationMatched).toBe(false)
    expect(validationError.filter(err => err.message === 'must have required property \'subject\'').length).toBe(1)
    expect(validationMessage).toBe(validationMsg)
  })

  test('"subject" is not a string', () => {
    const invalid = JSON.parse(JSON.stringify(templatePaylod))
    invalid.subject = ['Someting']

    const { validationMatched, validationError, validationMessage } = validate(mockedContext, invalid)
    expect(validationMatched).toBe(false)
    expect(validationError.filter(err => err.message === 'must be string' && err.property === 'subject').length).toBe(1)
    expect(validationMessage).toBe(validationMsg)
  })

  test('"text" is not a string', () => {
    const invalid = JSON.parse(JSON.stringify(templatePaylod))
    delete invalid.template
    invalid.text = ['Someting']

    const { validationMatched, validationError, validationMessage } = validate(mockedContext, invalid)
    expect(validationMatched).toBe(false)
    expect(validationError.filter(err => err.message === 'must be string' && err.property === 'text').length).toBe(1)
    expect(validationMessage).toBe(validationMsg)
  })

  test('"html" is not a string', () => {
    const invalid = JSON.parse(JSON.stringify(templatePaylod))
    invalid.html = ['Someting']

    const { validationMatched, validationError, validationMessage } = validate(mockedContext, invalid)
    expect(validationMatched).toBe(false)
    expect(validationError.filter(err => err.message === 'must be string' && err.property === 'html').length).toBe(1)
    expect(validationMessage).toBe(validationMsg)
  })

  test('"headers" is not an object', () => {
    const invalid = JSON.parse(JSON.stringify(templatePaylod))
    invalid.headers = ['Someting']

    const { validationMatched, validationError, validationMessage } = validate(mockedContext, invalid)
    expect(validationMatched).toBe(false)
    expect(validationError.filter(err => err.message === 'must be object' && err.property === 'headers').length).toBe(1)
    expect(validationMessage).toBe(validationMsg)
  })

  test('"text", "html" and "template" is missing', () => {
    const invalid = JSON.parse(JSON.stringify(templatePaylod))
    delete invalid.template

    const { validationMatched, validationError, validationMessage } = validate(mockedContext, invalid)
    expect(validationMatched).toBe(false)
    expect(validationError).toBe('Missing text, html or template')
    expect(validationMessage).toBe(validationMsg)
  })
})

describe('Validation fails when "attachments"', () => {
  test('Is an empty array', () => {
    const invalid = JSON.parse(JSON.stringify(templatePaylod))
    invalid.attachments = []

    const { validationMatched, validationError, validationMessage } = validate(mockedContext, invalid)
    expect(validationMatched).toBe(false)
    expect(validationError.filter(err => err.message === 'must NOT have fewer than 1 items' && err.property === 'attachments').length).toBe(1)
    expect(validationMessage).toBe(validationMsg)
  })

  test('Has an item that is not an object', () => {
    const invalid = JSON.parse(JSON.stringify(templatePaylod))
    invalid.attachments = ['Someting']

    const { validationMatched, validationError, validationMessage } = validate(mockedContext, invalid)
    expect(validationMatched).toBe(false)
    expect(validationError.filter(err => err.message === 'must be object' && err.property.includes('attachments')).length).toBe(1)
    expect(validationMessage).toBe(validationMsg)
  })

  test('Has an item that is missing "content", "filename" and "type"', () => {
    const invalid = JSON.parse(JSON.stringify(templatePaylod))
    invalid.attachments = [{}]

    const { validationMatched, validationError, validationMessage } = validate(mockedContext, invalid)
    expect(validationMatched).toBe(false)
    expect(validationError.filter(err => err.message === 'must have required property \'content\'' && err.property.includes('attachments')).length).toBe(1)
    expect(validationMessage).toBe(validationMsg)
  })

  test('Has an item that is missing "filename" and "type"', () => {
    const invalid = JSON.parse(JSON.stringify(templatePaylod))
    invalid.attachments = [
      {
        content: 'JVBERi0xLjcKCjEgMCBvYmogICUgZW50cnkgcG9pbnQKPDwKICAvVHlwZSAvQ2F0YWxvZwogIC9QYWdlcyAyIDAgUgo+PgplbmRvYmoKCjIgMCBvYmoKPDwKICAvVHlwZSAvUGFnZXMKICAvTWVkaWFCb3ggWyAwIDAgMjAwIDIwMCBdCiAgL0NvdW50IDEKICAvS2lkcyBbIDMgMCBSIF0KPj4KZW5kb2JqCgozIDAgb2JqCjw8CiAgL1R5cGUgL1BhZ2UKICAvUGFyZW50IDIgMCBSCiAgL1Jlc291cmNlcyA8PAogICAgL0ZvbnQgPDwKICAgICAgL0YxIDQgMCBSIAogICAgPj4KICA+PgogIC9Db250ZW50cyA1IDAgUgo+PgplbmRvYmoKCjQgMCBvYmoKPDwKICAvVHlwZSAvRm9udAogIC9TdWJ0eXBlIC9UeXBlMQogIC9CYXNlRm9udCAvVGltZXMtUm9tYW4KPj4KZW5kb2JqCgo1IDAgb2JqICAlIHBhZ2UgY29udGVudAo8PAogIC9MZW5ndGggNDQKPj4Kc3RyZWFtCkJUCjcwIDUwIFRECi9GMSAxMiBUZgooSGVsbG8sIHdvcmxkISkgVGoKRVQKZW5kc3RyZWFtCmVuZG9iagoKeHJlZgowIDYKMDAwMDAwMDAwMCA2NTUzNSBmIAowMDAwMDAwMDEwIDAwMDAwIG4gCjAwMDAwMDAwNzkgMDAwMDAgbiAKMDAwMDAwMDE3MyAwMDAwMCBuIAowMDAwMDAwMzAxIDAwMDAwIG4gCjAwMDAwMDAzODAgMDAwMDAgbiAKdHJhaWxlcgo8PAogIC9TaXplIDYKICAvUm9vdCAxIDAgUgo+PgpzdGFydHhyZWYKNDkyCiUlRU9G'
      }
    ]

    const { validationMatched, validationError, validationMessage } = validate(mockedContext, invalid)
    expect(validationMatched).toBe(false)
    expect(validationError.filter(err => err.message === 'must have required property \'filename\'' && err.property.includes('attachments')).length).toBe(1)
    expect(validationMessage).toBe(validationMsg)
  })

  test('Has an item that is missing "type"', () => {
    const invalid = JSON.parse(JSON.stringify(templatePaylod))
    invalid.attachments = [
      {
        content: 'JVBERi0xLjcKCjEgMCBvYmogICUgZW50cnkgcG9pbnQKPDwKICAvVHlwZSAvQ2F0YWxvZwogIC9QYWdlcyAyIDAgUgo+PgplbmRvYmoKCjIgMCBvYmoKPDwKICAvVHlwZSAvUGFnZXMKICAvTWVkaWFCb3ggWyAwIDAgMjAwIDIwMCBdCiAgL0NvdW50IDEKICAvS2lkcyBbIDMgMCBSIF0KPj4KZW5kb2JqCgozIDAgb2JqCjw8CiAgL1R5cGUgL1BhZ2UKICAvUGFyZW50IDIgMCBSCiAgL1Jlc291cmNlcyA8PAogICAgL0ZvbnQgPDwKICAgICAgL0YxIDQgMCBSIAogICAgPj4KICA+PgogIC9Db250ZW50cyA1IDAgUgo+PgplbmRvYmoKCjQgMCBvYmoKPDwKICAvVHlwZSAvRm9udAogIC9TdWJ0eXBlIC9UeXBlMQogIC9CYXNlRm9udCAvVGltZXMtUm9tYW4KPj4KZW5kb2JqCgo1IDAgb2JqICAlIHBhZ2UgY29udGVudAo8PAogIC9MZW5ndGggNDQKPj4Kc3RyZWFtCkJUCjcwIDUwIFRECi9GMSAxMiBUZgooSGVsbG8sIHdvcmxkISkgVGoKRVQKZW5kc3RyZWFtCmVuZG9iagoKeHJlZgowIDYKMDAwMDAwMDAwMCA2NTUzNSBmIAowMDAwMDAwMDEwIDAwMDAwIG4gCjAwMDAwMDAwNzkgMDAwMDAgbiAKMDAwMDAwMDE3MyAwMDAwMCBuIAowMDAwMDAwMzAxIDAwMDAwIG4gCjAwMDAwMDAzODAgMDAwMDAgbiAKdHJhaWxlcgo8PAogIC9TaXplIDYKICAvUm9vdCAxIDAgUgo+PgpzdGFydHhyZWYKNDkyCiUlRU9G',
        filename: 'helloworld.pdf'
      }
    ]

    const { validationMatched, validationError, validationMessage } = validate(mockedContext, invalid)
    expect(validationMatched).toBe(false)
    expect(validationError.filter(err => err.message === 'must have required property \'type\'' && err.property.includes('attachments')).length).toBe(1)
    expect(validationMessage).toBe(validationMsg)
  })

  test('Has an item that has an invalid base64 as content', () => {
    const invalid = JSON.parse(JSON.stringify(templatePaylod))
    invalid.attachments = [
      {
        content: 'JVBERi0xLjcKCjEgMCBvYmogICUgZW50cnkgcG9pbnQKPDwKICAvVHlwZSAvQ2F0YWxvZwogIC9QYWdlcyAyIDAgUgo+PgplbmRvYmoKCjIgMCBvYmoKPDwKICAvVHlwZSAvUGFnZXMKICAvTWVkaWFCb3ggWyAwIDAgMjAwIDIwMCBdCiAgL0NvdW50IDEKICAvS2lkcyBbIDMgMCBSIF0KPj4KZW5kb2JqCgozIDAgb2JqCjw8CiAgL1R5cGUgL1BhZ2UKICAvUGFyZW50IDIgMCBSCiAgL1Jlc291cmNlcyA8PAogICAgL0ZvbnQgPDwKICAgICAgL0YxIDQgMCBSIAogICAgPj4KICA+PgogIC9Db250ZW50cyA1IDAgUgo+PgplbmRvYmoKCjQgMCBvYmoKPDwKICAvVHlwZSAvRm9udAogIC9TdWJ0eXBlIC9UeXBlMQogIC9CYXNlRm9udCAvVGltZXMtUm9tYW4KPj4KZW5kb2JqCgo1IDAgb2JqICAlIHBhZ2UgY29udGVudAo8PAogIC9MZW5ndGggNDQKPj4Kc3RyZWFtCkJUCjcwIDUwIFRECi9GMSAxMiBUZgooSGVsbG8sIHdvcmxkISkgVGoKRVQKZW5kc3RyZWFtCmVuZG9iagoKeHJlZgowIDYKMDAwMDAwMDAwMCA2NTUzNSBmIAowMDAwMDAwMDEwIDAwMDAwIG4gCjAwMDAwMDAwNzkgMDAwMDAgbiAKMDAwMDAwMDE3MyAwMDAwMCBuIAowMDAwMDAwMzAxIDAwMDAwIG4gCjAwMDAwMDAzODAgMDAwMDAgbiAKdHJhaWxlcgo8PAogIC9TaXplIDYKICAvUm9vdCAxIDAgUgo+PgpzdGFydHhyZWYKNDkyCiUlRU9',
        filename: 'helloworld.pdf',
        type: 'application/pdf'
      }
    ]

    const { validationMatched, validationError, validationMessage } = validate(mockedContext, invalid)
    expect(validationMatched).toBe(false)
    expect(validationError.filter(err => err.message === 'must match format "base64"' && err.property.includes('attachments')).length).toBe(1)
    expect(validationMessage).toBe(validationMsg)
  })
})

describe('Validation fails when "template"', () => {
  test('Is not an object', () => {
    const invalid = JSON.parse(JSON.stringify(templatePaylod))
    invalid.template = []

    const { validationMatched, validationError, validationMessage } = validate(mockedContext, invalid)
    expect(validationMatched).toBe(false)
    expect(validationError).toBe('Missing templateName or template')
    expect(validationMessage).toBe(validationMsg)
  })

  test('Both "template" and "templateName" is present', () => {
    const invalid = JSON.parse(JSON.stringify(templatePaylod))
    invalid.template.template = '<html></html>'

    const { validationMatched, validationError, validationMessage } = validate(mockedContext, invalid)
    expect(validationMatched).toBe(false)
    expect(validationError).toBe('template and templateName can not be specified together')
    expect(validationMessage).toBe(validationMsg)
  })

  test('"templateData" is missing', () => {
    const invalid = JSON.parse(JSON.stringify(templatePaylod))
    delete invalid.template.templateData

    const { validationMatched, validationError, validationMessage } = validate(mockedContext, invalid)
    expect(validationMatched).toBe(false)
    expect(validationError.filter(err => err.message === 'must have required property \'templateData\'' && err.property.includes('template')).length).toBe(1)
    expect(validationMessage).toBe(validationMsg)
  })

  test('"templateData" is not an object', () => {
    const invalid = JSON.parse(JSON.stringify(templatePaylod))
    invalid.template.templateData = []

    const { validationMatched, validationError, validationMessage } = validate(mockedContext, invalid)
    expect(validationMatched).toBe(false)
    expect(validationError.filter(err => err.message === 'must be object' && err.property.includes('templateData')).length).toBe(1)
    expect(validationMessage).toBe(validationMsg)
  })

  test('"templateData.body" is missing', () => {
    const invalid = JSON.parse(JSON.stringify(templatePaylod))
    delete invalid.template.templateData.body

    const { validationMatched, validationError, validationMessage } = validate(mockedContext, invalid)
    expect(validationMatched).toBe(false)
    expect(validationError.filter(err => err.message === 'must have required property \'body\'' && err.property.includes('templateData')).length).toBe(1)
    expect(validationMessage).toBe(validationMsg)
  })

  test('"templateData.body" is not a string', () => {
    const invalid = JSON.parse(JSON.stringify(templatePaylod))
    invalid.template.templateData.body = []

    const { validationMatched, validationError, validationMessage } = validate(mockedContext, invalid)
    expect(validationMatched).toBe(false)
    expect(validationError.filter(err => err.message === 'must be string' && err.property.includes('body')).length).toBe(1)
    expect(validationMessage).toBe(validationMsg)
  })

  test('"templateData.signature" is not an object', () => {
    const invalid = JSON.parse(JSON.stringify(templatePaylod))
    invalid.template.templateData.signature = []

    const { validationMatched, validationError, validationMessage } = validate(mockedContext, invalid)
    expect(validationMatched).toBe(false)
    expect(validationError.filter(err => err.message === 'must be object' && err.property.includes('signature')).length).toBe(1)
    expect(validationMessage).toBe(validationMsg)
  })

  test('"templateData.signature.company" is not a string', () => {
    const invalid = JSON.parse(JSON.stringify(templatePaylod))
    invalid.template.templateData.signature.company = []

    const { validationMatched, validationError, validationMessage } = validate(mockedContext, invalid)
    expect(validationMatched).toBe(false)
    expect(validationError.filter(err => err.message === 'must be string' && err.property.includes('company')).length).toBe(1)
    expect(validationMessage).toBe(validationMsg)
  })

  test('"templateData.signature.department" is not a string', () => {
    const invalid = JSON.parse(JSON.stringify(templatePaylod))
    invalid.template.templateData.signature.department = []

    const { validationMatched, validationError, validationMessage } = validate(mockedContext, invalid)
    expect(validationMatched).toBe(false)
    expect(validationError.filter(err => err.message === 'must be string' && err.property.includes('department')).length).toBe(1)
    expect(validationMessage).toBe(validationMsg)
  })

  test('"templateData.signature.mobile" is not a string', () => {
    const invalid = JSON.parse(JSON.stringify(templatePaylod))
    invalid.template.templateData.signature.mobile = []

    const { validationMatched, validationError, validationMessage } = validate(mockedContext, invalid)
    expect(validationMatched).toBe(false)
    expect(validationError.filter(err => err.message === 'must be string' && err.property.includes('mobile')).length).toBe(1)
    expect(validationMessage).toBe(validationMsg)
  })

  test('"templateData.signature.name" is not a string', () => {
    const invalid = JSON.parse(JSON.stringify(templatePaylod))
    invalid.template.templateData.signature.name = []

    const { validationMatched, validationError, validationMessage } = validate(mockedContext, invalid)
    expect(validationMatched).toBe(false)
    expect(validationError.filter(err => err.message === 'must be string' && err.property.includes('name')).length).toBe(1)
    expect(validationMessage).toBe(validationMsg)
  })

  test('"templateData.signature.phone" is not a string', () => {
    const invalid = JSON.parse(JSON.stringify(templatePaylod))
    invalid.template.templateData.signature.phone = []

    const { validationMatched, validationError, validationMessage } = validate(mockedContext, invalid)
    expect(validationMatched).toBe(false)
    expect(validationError.filter(err => err.message === 'must be string' && err.property.includes('phone')).length).toBe(1)
    expect(validationMessage).toBe(validationMsg)
  })

  test('"templateData.signature.title" is not a string', () => {
    const invalid = JSON.parse(JSON.stringify(templatePaylod))
    invalid.template.templateData.signature.title = []

    const { validationMatched, validationError, validationMessage } = validate(mockedContext, invalid)
    expect(validationMatched).toBe(false)
    expect(validationError.filter(err => err.message === 'must be string' && err.property.includes('title')).length).toBe(1)
    expect(validationMessage).toBe(validationMsg)
  })

  test('"templateData.signature.virksomhet" is not a string', () => {
    const invalid = JSON.parse(JSON.stringify(templatePaylod))
    invalid.template.templateData.signature.virksomhet = []

    const { validationMatched, validationError, validationMessage } = validate(mockedContext, invalid)
    expect(validationMatched).toBe(false)
    expect(validationError.filter(err => err.message === 'must be string' && err.property.includes('virksomhet')).length).toBe(1)
    expect(validationMessage).toBe(validationMsg)
  })

  test('"templateData.signature.webpage" is not a string', () => {
    const invalid = JSON.parse(JSON.stringify(templatePaylod))
    invalid.template.templateData.signature.webpage = []

    const { validationMatched, validationError, validationMessage } = validate(mockedContext, invalid)
    expect(validationMatched).toBe(false)
    expect(validationError.filter(err => err.message === 'must be string' && err.property.includes('webpage')).length).toBe(1)
    expect(validationMessage).toBe(validationMsg)
  })

  test('"templateData.signature.webpage" is not in url format', () => {
    const invalid = JSON.parse(JSON.stringify(templatePaylod))
    invalid.template.templateData.signature.webpage = 'vg.no'

    const { validationMatched, validationError, validationMessage } = validate(mockedContext, invalid)
    expect(validationMatched).toBe(false)
    expect(validationError.filter(err => err.message === 'must match format "url"' && err.property.includes('webpage')).length).toBe(1)
    expect(validationMessage).toBe(validationMsg)
  })
})

describe('Validation succeeds', () => {
  test('When "template.templateData.body" is present', () => {
    const { validationMatched, validationError, validationMessage } = validate(mockedContext, templatePaylod)
    expect(validationMatched).toBe(true)
    expect(validationError).toBe(undefined)
    expect(validationMessage).toBe(undefined)
  })

  test('When "text" is present', () => {
    const valid = JSON.parse(JSON.stringify(templatePaylod))
    delete valid.template
    valid.text = 'Hey there'

    const { validationMatched, validationError, validationMessage } = validate(mockedContext, valid)
    expect(validationMatched).toBe(true)
    expect(validationError).toBe(undefined)
    expect(validationMessage).toBe(undefined)
  })

  test('When "html" is present', () => {
    const valid = JSON.parse(JSON.stringify(templatePaylod))
    delete valid.template
    valid.html = '<b>Hey there</b>'

    const { validationMatched, validationError, validationMessage } = validate(mockedContext, valid)
    expect(validationMatched).toBe(true)
    expect(validationError).toBe(undefined)
    expect(validationMessage).toBe(undefined)
  })
})
