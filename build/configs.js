const path = require('path')
const version = process.env.VERSION || require('../package.json').version
const banner =
    `/*!
  * vue-router v${version}
  * (c) ${new Date().getFullYear()} ahago
  * @license MIT
  */`
const resolve = _path => path.resolve(__dirname, '../', _path)
module.exports = [
    {
        file: resolve('dist/vue-router.js'),
        format: 'umd',
        env: 'development'
    },
].map(genConfig)
function genConfig (opts) {
    const config = {
        input: {
            input: resolve('src/index.js'),
            plugins: []
        },
        output: {
            file: opts.file,
            format: opts.format,
            banner,
            name: 'MyVueRouter'
        }
    }
    return config
}

