var postcss = require('postcss')
var imprt = require('postcss-import')
var constant = require('postcss-constant')
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
    if (this.compres) {
        output = postcss()
                 .use(imprt())
                 .use(constant(this.css))
                 .use(extend(this.css))
                 .use(csswring.postcss)
                 .process(css)
                 .css
    }
    else {
        output = postcss()
                 .use(imprt())
                 .use(constant(this.css))
                 .use(extend(this.css))
                 .process(this.css)
                 .css
    }
    return output
}
