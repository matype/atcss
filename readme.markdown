# AtCSS [![Build Status](https://travis-ci.org/morishitter/atcss.svg)](https://travis-ci.org/morishitter/atcss)

<img  width="150" height="150" src="http://morishitter.github.io/atcss/atcss.png">

AtCSS is annotations based CSS processing tool built with [PostCSS](https://github.com/postcss/postcss).

## Installation

```shell
$ npm install -g atcss
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
  padding: 8px 16px;
}

.base-2 {
  /*
   * @base
   */
  color: red;
}

.class {
  /*
   * @use .base-1
   */
  background-color: green;
}

.too-long-and-ugly-selector-name {
  /*
   * @use .base-2
   */
  margin: 10px;
}
```

Processed with the following command:

```
$ atcss input.css output.css
```

`output.css` (Yields):

```css
/* Inline expand import.css */
.imprt {
  color: blue;
}

.class {
  /*
   * @base
   * @constant
   */
  font-size: 12px;
  padding: 8px 16px;
}

.class {
  /*
   * @use .base-1
   */
  background-color: green;
}

.too-long-and-ugly-selector-name {
  /*
   * @use .base-2
   */
  margin: 10px;
  color: red;
}
```

## Why Annotations

AtCSS is 'Annotations based CSS processor'.
Using metadata to process CSS as annotations in comment, browsers can read prior code to be processed.

So, can devide styles for each environment (development or production).

We often make rules known as utility classes.
For example, `.pdt-10` as `padding-top: 10px`, `.bg-gray` as `background-color: #c3c9c9`.
There are some CSS frameworks has many utility classes like [BASSCSS](http://www.basscss.com/).
These are very usefull, because we can fine-tune design to suit our request.

But, utility classes are too low level to use as it is.
Because using execessive multiple classes do not change so much as inline style in HTML, and not aware of the semantic.

Using AtCSS, you can make semantic classes in production environment.

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
   * @use .btn, .btn-blue, .btn-lg
   */

   /* extend rules for button, you can define rules with semantic names */
}
```

## Features

### Constant block
The Rule sets are surrounded by `@start constant` and `@end constant` annotations cannot cascade.

```css
/* @start constant */
.class {
  color: red;
}

.class {
  color: blue; /* Error */
}

.nested .class {
  padding: 0; /* Error */
}

.child > .class {
    background-color: red; /* Error */
}
/* @end constant */
```

### High performance inheritance of other rules
The function to inherit other rules of AtCSS is defferent from `@extend` of existing CSS preprocessors like Sass.

Sass's `@extend` can only duplicate its selectors to base ones.
For example, when the declarations in base rules are too short or in media queries, or the selector inheritance destination rules is too long,
 duplicating its selector like Sass's `@extend` is not good consider file size.

In this case, the good behavior is expanding declarations in the base rule to inheritance destination rules.

AtCSS provides the interface to inherit other rules, `@use`.
And, AtCSS processor automatically choose the most appropriate method to inherit.

`input.css`:
```css
.base-1 {
  /*
   * @base
   */
  font-size: 12px;
  padding: 8px 16px;
}

.base-2 {
  /*
   * @base
   */
  color: red;
}

.class {
  /*
   * @use .base-1
   */
  background-color: green;
}

.too-long-and-ugly-selector-name {
  /*
   * @use .base-2
   */
  margin: 10px;
}
```

`output.css` (Yields):

```css
.class {
  /*
   * @base
   */
  font-size: 12px;
  padding: 8px 16px;
}

.class {
  /*
   * @use .base-1
   */
  background-color: green;
}

.too-long-and-ugly-selector-name {
  /*
   * @use .base-2
   */
  margin: 10px;
  color: red;
}
```

## Using plugins

- [autoprefixer](https://github.com/postcss/autoprefixer)
- [postcss-constant](https://github.com/morishitter/postcss-constant)
- [postcss-annotation-extend](https://github.com/morishitter/postcss-annotation-extend)
- [postcss-include](https://github.com/morishitter/postcss-include)
- [postcss-import](https://github.com/postcss/postcss-import)
- [postcss-important](https://github.com/morishitter/postcss-important)
- [postcss-atcss-constant](https://github.com/morishitter/postcss-atcss-constant)
- [postcss-atcss-inherit](https://github.com/morishitter/postcss-atcss-inherit)

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

### `@start constant` & `@end constant`

### `@use`


## Options

```
$ atcss --help
```

```
Usage: atcss input-name output-name [options]

Options:

  -c, --compress    use output compression
  -V, --versions    output the version number
  -h, --help        output usage information
```

## Option projects

- [grunt-atcss](https://github.com/morishitter/grunt-atcss)
- [gulp-atcss](https://github.com/morishitter/gulp-atcss)

## License

The MIT License (MIT)

Copyright (c) 2014 Masaaki Morishita
