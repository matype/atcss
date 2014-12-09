# ACSS [![Build Status](https://travis-ci.org/morishitter/acss.svg)](https://travis-ci.org/morishitter/acss)

Annotated CSS (ACSS) is annotations based CSS processing tool built with [PostCSS](https://github.com/postcss/postcss).

## Installation

```shell
$ npm install acss
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
```

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

## License

The MIT License (MIT)

Copyright (c) 2014 Masaaki Morishita
