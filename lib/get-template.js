module.exports = (name) => {
  try {
    return require(`./templates/${name.toLowerCase()}`)()
  } catch {
    return ''
  }
}
