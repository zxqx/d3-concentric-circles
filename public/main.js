var d3ConcentricCircles = require('../index.js');

var data = [
  { display: 'Other', value: 77 },
  { display: 'Apps', value: 158 },
  { display: 'OS', value: 92 },
  { display: 'Hardware', value: 80 },
  { display: 'Network', value: 194 }
];

d3ConcentricCircles('.container', data, {
  labelField: 'display'
});
