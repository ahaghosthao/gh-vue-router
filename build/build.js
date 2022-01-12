const configs = require("./configs")
const fs = require('fs')
const path = require('path')
const zlib = require('zlib')
const terser = require('terser')
const rollup = require('rollup')
if (!fs.existsSync('dist')) {
    fs.mkdirSync('dist')
}

build(configs)
function build(builds) {
    let builtCount = 0
    const total = builds.length
    const next = () => {
        buildEntry(builds[builtCount])
            .then(() => {
                builtCount++
                if (builtCount < total) {
                    next()
                }
            })
            .catch(logError)
    }
    next()
}


function buildEntry({input, output}) {
    const { file, banner } = output
    const isProd = /min\.js$/.test(file)
    return rollup
        .rollup(input)
        .then(bundle => bundle.generate(output))
        .then(bundle => {
            const code = bundle.output[0].code
            if (isProd) {
                const minified =
                    (banner ? banner + '\n' : '') +
                    terser.minify(code, {
                        toplevel: true,
                        output: {
                            ascii_only: true
                        },
                        compress: {
                            pure_funcs: ['makeMap']
                        }
                    }).code
                return write(file, minified, true)
            } else {
                return write(file, code)
            }
        })
}

function write (dest, code, zip) {
    return new Promise((resolve, reject) => {
        function report (extra) {
            console.log(
                blue(path.relative(process.cwd(), dest)) +
                ' ' +
                getSize(code) +
                (extra || '')
            )
            resolve()
        }

        fs.writeFile(dest, code, err => {
            if (err) return reject(err)
            if (zip) {
                zlib.gzip(code, (err, zipped) => {
                    if (err) return reject(err)
                    report(' (gzipped: ' + getSize(zipped) + ')')
                })
            } else {
                report()
            }
        })
    })
}
function getSize (code) {
    return (code.length / 1024).toFixed(2) + 'kb'
}
function blue (str) {
    return '\x1b[1m\x1b[34m' + str + '\x1b[39m\x1b[22m'
}

function logError(e) {
    console.log(e)
}

