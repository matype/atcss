var postcss = require('postcss')
var autoprefixer = require('autoprefixer')
var constant = require('postcss-constant')
var csswring = require('csswring')
var important = require('postcss-important')
var imprt = require('postcss-import')
var extend = require('postcss-extend')

module.exports = Acss

function Acss (css, options) {
    if (!this instanceof Acss) return new Acss(css, options)
    options = options || {}
    this.css = css
    this.compress = options.compress
}

Acss.prototype.process = function () {
    var output
    if (this.compress) {
        output = postcss()
                 .use(imprt())
                 .use(constant(this.css))
                 .use(extend(this.css))
                 .use(important(this.css))
                 .use(autoprefixer.postcss)
                 .use(csswring.postcss)
                 .process(this.css)
                 .css
    }
    else {
        output = postcss()
                 .use(imprt())
                 .use(constant(this.css))
                 .use(extend(this.css))
                 .use(important(this.css))
                 .use(autoprefixer.postcss)
                 .process(this.css)
                 .css
    }
    return output
}
