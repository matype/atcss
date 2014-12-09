#!/usr/bin/env node

var optimist = require('optimist')
var argv = optimist.alias('V', 'versions')
                   .alias('h', 'help')
                   .alias('c', 'compress')
                   .argv

var pkg = require('./package.json')
var fs = require('fs')
var Acss = require('./')

if (argv.V) console.log(pkg.version)

if (argv.h) {
    console.log('Usage: acss input-name output-name [options]');
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
    var acss = new Acss(css, options)
    fs.writeFile(output, acss.process(css), function (err) {
        if (err) throw err
        console.log('Processed')
    })
}
