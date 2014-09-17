var test = require('tape');
var D3ConcentricCircles = require('../index.js');

test('basics', function(t) {
  t.plan(1);

  var data = [
    { label: 'Label', value: 100 },
    { label: 'Label 2', value: 132 },
  ];

  var container = document.createElement('div');
  container.classList.add('container');
  document.body.appendChild(container);

  t.ok(new D3ConcentricCircles('.container', data));
});
