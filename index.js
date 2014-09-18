module.exports = d3ConcentricCircles;

var ConcentricData    = require('./lib/ConcentricData.js');
var ConcentricCircles = require('./lib/ConcentricCircles.js');

/**
 * Set up viz and model binding and render the viz
 * @param {string} selector
 * @param {array} data
 * @param {object=} options
 * @return {ConcentricCircles}
 */
function d3ConcentricCircles(selector, data, options) {
  var viz   = new ConcentricCircles(selector, options);
  var model = new ConcentricData(data, viz.options);
  viz.model = model;

  viz.render();
  return viz;
}
