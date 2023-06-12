const path = require('path')

const buildEslintCommand = filenames =>
  `yarn fmt:fix --file ${filenames
    .map(f => path.relative(process.cwd(), f))
    .join(' --file ')}`

module.exports = {
  '*.{js,mjs,jsx,ts,tsx}': [buildEslintCommand]
}
