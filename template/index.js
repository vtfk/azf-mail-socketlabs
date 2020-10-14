const barhandles = require('barhandles');
const fs = require('fs');
const path = require('path');

const dirPath = `${__dirname}/../lib/templates`;

module.exports = async function (context, req) {
    context.log('JavaScript HTTP trigger function processed a request.');
    
    let templates = [];
    fs.readdirSync(dirPath).map(fileName => {
        let template = require(`${dirPath}/${fileName}`)();
        let fileNameWithoutExtension = fileName.replace(path.extname(fileName), '');
        if ((!req.body || !req.body.template) || (req.body.template && req.body.template.toLowerCase() === fileNameWithoutExtension.toLowerCase())) {
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