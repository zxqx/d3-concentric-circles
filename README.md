# D3 Concentric Circles

A concentric circles visualization plugin using the D3 library.

## Requirements

+ NodeJS

## Installation

```
$ npm install d3-concentric-circles
```

If needed, you can generate a standalone UMD module at `dist/d3-concentric-circles.js` (for use with `script` tags or AMD module loaders like RequireJS):

```
$ npm run build
```

## Usage

### d3ConcentricCircles(selector, data, options=)

with browserify:

```js
var d3ConcentricCircles = require('d3-concentric-circles');

d3ConcentricCircles('.container', data);
```

with RequireJS:

```js
define(function(require) {
  var d3ConcentricCircles = require('d3-concentric-circles');

  d3ConcentricCircles('.container', data);
});
```

Add CSS stylesheet located at `style/d3-concentric-circles.css`:

```html
<link href="path/to/your/stylesheets/d3-concentric-circles.css" rel="stylesheet">
```

## Example

Generate an example at `example/index.html`:

```
$ npm run example
```

## Options

Pass an optional `options` hash to override plugin defaults:

### options.valueField `string` (default: `'value'`)
The `value` field used to determine the radii of each circle.

### options.labelField `string` (default: `'label'`)
The `label` field used for the legend label.

### options.colors `array`
A list of colors to be used for the circles.

### options.legend `boolean` (default: `true`)
Turn the legend on/off.

### options.onClick `function(event)`
A callback function to be fired when a circle is clicked. Receives an `event` argument containing the data for that circle.

Using options:
```js
d3ConcentricCircles('.container', data, {
  valueField : 'value',
  labelField : 'display',
  colors     : ['#08534c', '#28825f', '#fc8f32', '#dc4f00', '#f60202'],
  legend     : true;
  onClick    : function(e) {
    console.log(e);
  }
});
```

## Methods

### render()
Re-render the visualization; useful if bound data or container size has changed.

```js
var viz = d3ConcentricCircles('.container', data);

// several moments later...

viz.render();

// viz re-rendered
```

## Test

Run tests via tape:

```
$ npm test
```
