var test                = require('tape');
var isFunction          = require('is-function');
var d3                  = require('d3');
var D3ConcentricCircles = require('../index.js');

test('basics', function(t) {
  t.plan(4);

  var data = [
    { label: 'Label', value: 100 },
    { label: 'Label 2', value: 132 },
  ];

  var container = document.createElement('div');
  container.classList.add('container');
  document.body.appendChild(container);

  t.ok(isFunction(d3.concentricCircles),
    'extends d3 with method');

  t.throws(function(t) {
    d3.concentricCircles(null, data);
  }, 'should throw when `selector` is not provided');

  t.throws(function(t) {
    d3.concentricCircles('.container');
  }, 'should throw when `data` is not provided');

  t.throws(function(t) {
    d3.concentricCircles('body');
  }, 'should throw if container element is not empty');

  document.body.removeChild(container);
});

test('options', function(t) {
  t.plan(1);

  var data = [
    { label: 'Label', value: 100 },
    { label: 'Label 2', value: 132 }
  ];

  var options = {
    valueField : 'value',
    labelField : 'label',
    colors     : ['#fff', '#ccc', '#000'],
    legend     : false,
    onClick    : function(e) {
      console.log(e);
    }
  };

  var container = document.createElement('div');
  container.classList.add('container');
  document.body.appendChild(container);

  var cc = d3.concentricCircles('.container', data, options);

  t.deepEquals(options, cc.options,
    'should merge runtime options with defaults');

  document.body.removeChild(container);
});

test('dom', function(t) {
  t.plan(1);

  var data = [
    { label: 'Label', value: 100 },
    { label: 'Label 2', value: 132 },
  ];

  var container = document.createElement('div');
  container.classList.add('container');
  document.body.appendChild(container);

  var cc = d3.concentricCircles('.container', data);
  var svg = document.querySelector('.container svg');

  t.ok(svg, 'should create svg element');
});
