module.exports = (name) => {
    let template = '';
    try {
        template = require(`./templates/${name.toLowerCase()}`)();
    }
    catch {
    }
    return template;
}