const barhandles = require('barhandles');
const fs = require('fs');
const path = require('path');

const dirPath = `${__dirname}/../lib/templates`;

module.exports = async function (context, req) {
    context.log('JavaScript HTTP trigger function processed a request.');
    
    let templates = [];

    if (!req.params.template) {
        context.res = {
            status: 400,
            body: "Template name missing in the url"
        };
        return;
    }

    fs.readdirSync(dirPath).map(fileName => {
        let template = require(`${dirPath}/${fileName}`)();
        let fileNameWithoutExtension = fileName.replace(path.extname(fileName), '');

        if ((req.params.template.toLowerCase() === 'all') || (req.params.template.toLowerCase() === fileNameWithoutExtension.toLowerCase())) {
            templates.push({
                name: fileNameWithoutExtension,
                schema: barhandles.extractSchema(template)
            });
        }
    });

    if (templates.length > 0) {
        context.res = {
            status: 200,
            body: (templates.length == 1 ? templates[0] : templates)
        };
    }
    else {
        context.res = {
            status: 404,
            body: "No templates found..."
        };
    }
}