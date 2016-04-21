# D3 Concentric Circles

A concentric circles visualization plugin for the D3 library.

[![Circle CI](https://circleci.com/gh/zakangelle/d3-concentric-circles/tree/master.svg?style=shield)](https://circleci.com/gh/zakangelle/d3-concentric-circles/tree/master) [![Coverage Status](https://img.shields.io/coveralls/zakangelle/d3-concentric-circles.svg)](https://coveralls.io/github/zakangelle/d3-concentric-circles?branch=master) [![See Demo](https://img.shields.io/badge/see-demo-28825f.svg)](https://dl.dropboxusercontent.com/u/21334841/demos/d3-concentric-circles/index.html)

<a href="https://dl.dropboxusercontent.com/u/21334841/demos/d3-concentric-circles/index.html">
  <img src='https://www.dropbox.com/s/8mbouimb3pnez9t/d3-concentric-circles.png?raw=1' width='500px' />
</a>

## Installation

```sh
$ npm install d3-concentric-circles
```

## Usage

```js
import d3ConcentricCircles from 'd3-concentric-circles';

d3ConcentricCircles('.container', data);
```

Source the CSS stylesheet located at `style/d3-concentric-circles.css`.

## Options

Pass an optional `options` hash to override plugin defaults.

| option        | type      | default   | description                                                   |
|---------------|-----------|-----------|---------------------------------------------------------------|
| `valueField`  | string    | `'value'` | The `value` field used to determine the radii of each circle. |
| `labelField`  | string    | `'label'` | The `label` field used for the legend label.                  |
| `colors`      | array     |           | A list of colors to be used for the circles.                  |
| `legend`      | boolean   | `true`    | Turn the legend on/off.                                       |
| `onClick`     | function  |           | A callback function to be fired when a circle is clicked. Receives an `event` argument containing the data for that circle.                                                 |

Using options:
```js
d3ConcentricCircles('.container', data, {
  valueField: 'value',
  labelField: 'display',
  colors: ['#08534c', '#28825f', '#fc8f32', '#dc4f00', '#f60202'],
  legend: true,
  onClick: e => console.log(e)
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

## Example

Generate an example at `example/index.html`:

```sh
$ npm run example
```

## Standalone

Generate a standalone build in `dist` (for use with `<script>` tags and AMD module loaders):

```sh
$ npm run build:standalone
```

## Test

Run tests with [karma](https://karma-runner.github.io) and [mocha](https://mochajs.org/):

```
$ npm test
```

## License

MIT
