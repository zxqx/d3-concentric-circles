var d3ConcentricCircles = require('../index.js');

var data = [
  { display: 'Network', value: 77 },
  { display: 'Hardware', value: 158 },
  { display: 'OS', value: 92 },
  { display: 'Apps', value: 80 },
  { display: 'Other', value: 194 }
];

d3ConcentricCircles('.container', data, {
  labelField: 'display'
});
