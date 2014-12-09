var fs  = require('fs')
var test = require('tape')
var Acss = require('..')

function input (name) {
    return fs.readFileSync('test/fixtures/' + name + '.css', 'utf-8').trim()
}

function output (name) {
    return fs.readFileSync('test/fixtures/' + name + '.out.css', 'utf-8').trim()
}

function compare (name, description, options) {
    descriptions = description || {}
    options = options || {}
    var acss = new Acss(input(name))
    return test(description, function (t) {
        t.equal(acss.process(input(name), options), output(name))
        t.end()
    })
}

compare('test-1')
