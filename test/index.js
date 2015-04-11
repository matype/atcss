var fs  = require('fs')
var test = require('tape')
var Atcss = require('..')

function input (name) {
    return fs.readFileSync('test/fixtures/' + name + '.css', 'utf-8').trim()
}

function output (name) {
    return fs.readFileSync('test/fixtures/' + name + '.out.css', 'utf-8').trim()
}

function compare (name, description, options) {
    descriptions = description || {}
    options = options || {}
    var atcss = new Atcss(input(name))
    return test(description, function (t) {
        t.equal(atcss.process(input(name), options), output(name))
        t.end()
    })
}

compare('test-1')
compare('test-2')
compare('test-3')
compare('test-4')
compare('test-5')
compare('test-6')
compare('test-7')
compare('test-8')
