# ACSS [![Build Status](https://travis-ci.org/morishitter/acss.svg)](https://travis-ci.org/morishitter/acss)

<img  width="150" height="150" src="http://morishitter.github.io/acss/acss.png">

ACSS is annotations based CSS processing tool built with [PostCSS](https://github.com/postcss/postcss).

## Installation

```shell
$ npm install -g acss
```

## Example

`input.css`:
```css
@import url("test/fixtures/import.css");

.base-1 {
  /*
   * @base
   * @constant
   */
  font-size: 12px;
}

.base-2 {
  /*
   * @base
   */
  color: red;
}

.foo {
  /*
   * @extend .base-1, .base-2
   */
  padding: 10px;
}

.bar {
  /*
   * @extend .base-1
   */
  margin: 10px;
}

.baz {
  /*
   * @include .base-1
   */
  color: blue;
}
```

Processed with the following command:

```
$ acss input.css output.css
```

`output.css` (Yields):

```css
/* Inline expand import.css */
.imprt {
  color: blue;
}

.foo,
.bar {
  /*
   * @base
   * @constant
   */
  font-size: 12px;
}

.foo {
  /*
   * @base
   */
  color: red;
}

.foo {
  /*
   * @extend .base-1, .base-2
   */
  padding: 10px;
}

.bar {
  /*
   * @extend .base-1
   */
  margin: 10px;
}

.baz {
  /*
   * @include .base-1
   */
  font-size: 12px;
  color: blue;
}
```

## Why Annotations

ACSS is 'Annotations based CSS processor'.
Using metadata to process CSS as annotations in comment, browsers can read prior code to be processed.

So, can devide styles for each environment (development or production).

We often make rules known as utility classes.
For example, `.pdt-10` as `padding-top: 10px`, `.bg-gray` as `background-color: #c3c9c9`.
There are some CSS frameworks has many utility classes like [BASSCSS](http://www.basscss.com/).
These are very usefull, because we can fine-tune design to suit our request.

But, utility classes are too low level to use as it is.
Because using execessive multiple classes do not change so much as inline style in HTML, and not aware of the semantic.

Using ACSS, you can make semantic classes in production environment.

Ex:

```css
.btn {
  /*
   * @base
   */

  /* base button declarations */
}

.btn-blue {
  /*
   * @base
   */

  /* to color button red */
}

.btn-lg {
  /*
   * @base
   */

  /* to enlarge button */
}

.btn-next {
  /*
   * @extend .btn, .btn-blue, .btn-lg
   */

   /* extend rules for button, you can define rules with semantic names */
}
```

## Using plugins

- [autoprefixer](https://github.com/postcss/autoprefixer)
- [postcss-constant](https://github.com/morishitter/postcss-constant)
- [postcss-extend](https://github.com/morishitter/postcss-extend)
- [postcss-include](https://github.com/morishitter/postcss-include)
- [postcss-import](https://github.com/postcss/postcss-import)
- [postcss-important](https://github.com/morishitter/postcss-important)

## Annotations syntax

### `@constant`

Rule sets using `@constant`, cannot override the rule set with the same selector.

Ex:

```css
.class {
  /*
   * @constant
   */
   padding: 10px 14px;
}

.class {
  padding: 0;
}
```

**Run error**

### `@base`

Rule sets using `@base`, is the rule sets that is inherited from the other ones.

Rules with `@base` do not output to css file after processing.

```css
.base-class {
  /*
   * @base
   */
   color: red;
}
```

### `@extend`

Using `@extend`, you can inherit other rule sets defined with `@base`.

`@extend` get one or more arguments, it's just selectors in `@base` rule sets.

```css
.base-1 {
  /*
   * @base
   */
   color: red;
}

.base-2 {
  /*
   * @base
   * @constant
   */
   font-size: 14px;
   padding: 12px 16px;
}

.class {
  /*
   * @extend .base-1, .base-2
   */
}
```

Process above code. Yield:

```css
.class {
  /*
   * @base
   */
   color: red;
}

.class {
  /*
   * @base
   * @constant
   */
   font-size: 14px;
   padding: 12px 16px;
}

.class {
  /*
   * @extend .base-1, .base-2
   */
}
```

### `@include`

```css
.base-1 {
  /*
   * @base
   */
   color: red;
}

.base-2 {
  /*
   * @base
   * @constant
   */
   font-size: 14px;
   padding: 12px 16px;
}

.class {
  /*
   * @include .base-1, .base-2
   */
}
```

Process above code. Yield:

```css
.class {
  /*
   * @include .base-1, .base-2
   */
   color: red;
   font-size: 14px;
   padding: 12px 16px;
}
```

### `@important`

Using `@important`, you can manage properties have `!impotant` at one place.

```css
.class {
  /*
   * @important font-size, padding
   */
   color: red;
   font-size: 12px;
   padding: 12px;
}
```

Process above code. Yield:

```css
.class {
  /*
   * @important font-size, padding
   */
   color: red;
   font-size: 12px !important;
   padding: 12px !important;
}
```

See also [postcss-important](https://github.com/morishitter/postcss-important).


## Options

```
$ acss --help
```

```
Usage: acss input-name output-name [options]

Options:

  -c, --compress    use output compression
  -V, --versions    output the version number
  -h, --help        output usage information
```

## Option projects

- [grunt-acss](https://github.com/morishitter/grunt-acss)
- [gulp-acss](https://github.com/morishitter/gulp-acss)

## License

The MIT License (MIT)

Copyright (c) 2014 Masaaki Morishita
