# Azure function mail socketlabs

## Setup

### Development setup

Create/Update **local.settings.json** with this:
```json
{
  "IsEncrypted": false,
  "Values": {
    "FUNCTIONS_WORKER_RUNTIME": "node",
    "AzureWebJobsStorage": "UseDevelopmentStorage=true",
    "AzureWebJobsServiceBus": "",
    "SOCKETLABS_SERVER_ID": your-socketlabs-server-id,
    "SOCKETLABS_API_KEY": "your-socketlabs-api-key",
    "E18_URL": "https://e18url.net", // optional
    "E18_KEY": "secret token", // optional
    "E18_SYSTEM": "dsf" // optional
  },
  "ConnectionStrings": {}
}
```

### E18

To support E18, add `E18_URL`, `E18_KEY` and `E18_SYSTEM`

### Setup in Azure

1. Publish Azure function
1. In Configuration in your Azure function, add these Application settings
    1. SOCKETLABS_SERVER_ID
    1. SOCKETLABS_API_KEY

## **POST** `/mail`

### without templating

```json
{
  "to": [
    "kari@nordmann.no",
    "bjarne@nordmann.no"
  ],
  "cc": [
    "kjartan@nordmann.no"
  ],
  "bcc": [
    "rolf@nordmann.no"
  ],
  "from": "Ola Nordmann <ola@nordmann.no>",
  "subject": "Test",
  "text": "Heihei",
  "html": "<b>Heihei</b>"
}
```

### with templating

```json
{
  "to": [
    "kari@nordmann.no",
    "bjarne@nordmann.no"
  ],
  "cc": [
    "kjartan@nordmann.no"
  ],
  "bcc": [
    "rolf@nordmann.no"
  ],
  "from": "Ola Nordmann <ola@nordmann.no>",
  "subject": "Test",
  "template": {
    "templateName": "example",
    "templateData": {
      "body": "<i>Something</i>.", // can also be an array of strings
      "signature": {
        "name": "Ola Nordmann",
        "title": "Boss",
        "department": "Computer geek",
        "company": "Example company",
        "phone": "81549300",
        "mobile": "01189998819919117253"
      }
    }
  }
}
```

### with attachments

```json
{
  ...,
  "attachments": [
    {
      "content": "document in base64",
      "filename": "name of file",
      "type": "application/json"
    }
  ]
}
```

## **GET** `/template/{template}`

Get template handlebars

### Get all templates

**/template/all**


### Get specific template

**/template/example**
