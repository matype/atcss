#!/usr/bin/env node

var minimist = require('minimist')
var argv = minimist(process.argv.slice(2), {
    boolean: [
        'help',
        'versions'
    ],
    alias: {
        c: 'compress',
        h: 'help',
        V: 'versions'
    }
})

var pkg = require('./package.json')
var fs = require('fs')
var Atcss = require('./')

if (argv.V) console.log(pkg.version)

if (argv.h) {
    console.log('Usage: atcss input-name output-name [options]');
    console.log('');
    console.log('Options:');
    console.log('');
    console.log('  -c, --compress    use output compression');
    console.log('  -V, --versions    output the version number');
    console.log('  -h, --help        output usage information');
}

if (argv._[0] && argv._[1]) {
    var input = argv._[0]
    var output = argv._[1]
    var compress = false
    if (argv.c) compress = true
    var options = {}
    options.compress = compress
    var css = fs.readFileSync(input, 'utf-8')
    var atcss = new Atcss(css, options)
    fs.writeFile(output, atcss.process(css), function (err) {
        if (err) throw err
        console.log('Processed')
    })
}
