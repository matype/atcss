var postcss = require('postcss')
var autoprefixer = require('autoprefixer')
var constant = require('postcss-constant')
var csswring = require('csswring')
var include = require('postcss-include')
var important = require('postcss-important')
var imprt = require('postcss-import')
var extend = require('postcss-annotation-extend')
var constantBlock = require('postcss-atcss-constant')
var inherit = require('postcss-atcss-inherit')
var removeBase = require('postcss-remove-base')

module.exports = Atcss

function Atcss (css, options) {
    if (!this instanceof Atcss) return new Atcss(css, options)
    options = options || {}
    this.css = css
    this.compress = options.compress
}

Atcss.prototype.process = function () {
    var output = postcss()
        .use(imprt())
        .use(constant(this.css))
        .use(constantBlock(this.css))
        .use(include({css: this.css, removeBase: false}))
        .use(extend(this.css))
        .use(inherit(this.css))
        .use(removeBase())
        .use(important(this.css))
        .use(autoprefixer.postcss);

    if (this.compress) {
        output = output.use(csswring.postcss)
    }

    return output.process(this.css).css
}
