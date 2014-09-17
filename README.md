# D3 Concentric Circles

A concentric circles visualization using the D3 library.

## Installation

via npm:

```
$ npm install d3-concentric-circles
```

or Bitbucket:

```
$ git clone git@bitbucket.org:zangelle/sbp_d3_concentric_circles.git
```

## Usage

### d3.concentricCircles(selector, data, options=)

with browserify:

```js
var d3 = require('d3');
require('d3-concentric-circles');

d3.concentricCircles('.container', data, {
  valueField : 'value',
  labelField : 'display',
  onClick    : function(e) {
    console.log(e);
  }
});
```

with RequireJS:

```js
define(function(require) {
  var d3 = require('d3');
  require('d3-concentric-circles');

  d3.concentricCircles('.container', data, {
    valueField : 'value',
    labelField : 'display',
    onClick    : function(e) {
      console.log(e);
    }
  });
});
```

## Methods

### viz.render()
Re-render the visualization.

