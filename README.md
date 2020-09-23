# Azure function mail socketlabs

## input without templating

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

## input with templating

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

## attachments

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