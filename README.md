# inline-loader
A webpack loader that wraps the content of a resource inside a `<div>` element and inserts it into the DOM. This loader was initially intended to inline SVG sprites which can then be used as described by [this CSS-TRICKS article](https://css-tricks.com/svg-sprites-use-better-icon-fonts/). However, since inlining an svg is not different from inlining any other markup, you can inline any type of HTML-like markup.

## Installation

```bash
$ npm install inline-loader --save
```

## Usage
If you are unfamiliar with loaders for webpack, have a look at [Documentation: Using loaders](http://webpack.github.io/docs/using-loaders.html).

To use the inline-loader, add it to your _webpack.config.js_ as follows:

```javascript
loaders: [
  { test: /\.svg$/i, loader: 'inline' }
]
```

Replace the regular expression as needed to support specific paths and/or file types.

The inline-loader wraps the content of a resource inside a `<div>` element and assigns an `id` attribute

```html
<div id="inline-[filename]">
  <!-- resource content -->
</div>
```

where `filename` is the filename of the resource _without_ extension.

By default, the wrapper `<div>` will be inserted into the DOM at the end of the `<body>` element. If you prefer to wrap all your inlined code inside a specific existing element, you can pass the `parentId` option to the inline-loader inside the webpack query

```javascript
loaders: [
  { test: /\.svg$/i, loader: 'inline?parentId=[id]' }
]
```

where `id` is the id of your overall wrapper element.

### RelativeTo and Prefix

You can set the base path of your templates using the `relativeTo` parameters. `relativeTo` is used
to strip a matching prefix from the absolute path of the input html file.

The path up to and including the first `relativeTo` match is stripped, e.g.

``` javascript
require('!ngtemplate?relativeTo=/src/!html!/test/src/test.svg');
// c.put('test.svg', ...)
```

To match the from the start of the absolute path prefix a '//', e.g.

``` javascript
require('!ngtemplate?relativeTo=//Users/felixjung/project/test/!html!/test/src/test.svg');
// c.put('src/test.svg', ...)
```

## Planned features
- [ ] Support for chaining with other loaders such as the [image-webpack-loader](https://github.com/tcoopman/image-webpack-loader).
- [ ] Write tests.
- [ ] More flexibility regarding wrapper elements.
- [ ] Support for adding classes to wrapper elements.

## Release History
- [ 2015-08-12 | 0.1.0 ) - Initial release

## Credit
This is my first loader for webpack. I took a lot of ideas from the [file-loader](https://github.com/webpack/file-loader) and the [style-loaders](https://github.com/webpack/style-loader). The relativeTo feature was taken from [ngtemplate-loader](https://github.com/WearyMonkey/ngtemplate-loader)

## License
MIT ([http://www.opensource.org/licenses/mit-license.php](http://www.opensource.org/licenses/mit-license.php))
