# Azure function mail socketlabs

# Development setup
Create/Update **local.settings.json** with this:
```javascript
{
    "IsEncrypted": false,
    "Values": {
      "FUNCTIONS_WORKER_RUNTIME": "node",
      "AzureWebJobsStorage": "UseDevelopmentStorage=true",
      "AzureWebJobsServiceBus": "",
      "SOCKETLABS_SERVER_ID": your-socketlabs-server-id,
      "SOCKETLABS_API_KEY": "your-socketlabs-api-key"
    },
    "ConnectionStrings": {}
  }
```

# Setup in Azure

1. Publish Azure function
1. In Configuration in your Azure function, add these Application settings
    1. SOCKETLABS_SERVER_ID
    1. SOCKETLABS_API_KEY

# Inputs

## without templating

```javascript
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

## with templating

```javascript
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
            "body": "<i>Something</i>.",
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

## with attachments

```javascript
{
    ...
    "attachments": [
        {
            "content": "document in base64",
            "filename": "name of file",
            "type": "application/json"
        }
    ]
}
```
