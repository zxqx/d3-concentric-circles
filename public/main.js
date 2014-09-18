var d3ConcentricCircles = require('../index.js');

var data = [
  { display: 'Item Name', value: 77 },
  { display: 'Item Name', value: 158 },
  { display: 'Item Name', value: 92 },
  { display: 'Item Name', value: 80 },
  { display: 'Item Name', value: 194 }
];

d3ConcentricCircles('.container', data, {
  labelField: 'display'
});
