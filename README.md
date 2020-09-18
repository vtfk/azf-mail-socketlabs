# Azure function mail socketlabs

## input

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
	"html": "<b>Heihei</b>",
	"templateId": "kadngd-djkdrsbjøds.bnsdjb",
	"templateData": {
		"body": "<b><i>Noe greier</i>.</b>",
        "signature": {
            "name": "Ola Nordmann",
            "title": "Sjef",
            "department": "EDB-avdelinga",
            "company": "Brukerbehov, avdigitalisering og kommunisering",
            "phone": "81549300",
            "mobile": "01189998819919117253"
        }
	}
}
```