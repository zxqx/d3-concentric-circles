module.exports = ConcentricCircles;

var d3        = require('d3');
var extend    = require('extend');
var normalize = require('normalize-to-range');

var TEMPLATE = require('./legend.hbs');

var DEFAULT_OPTIONS = {
  valueField : 'value',
  labelField : 'label',
  colors     : ['#08534c', '#28825f', '#fc8f32', '#dc4f00', '#f60202'],
  legend     : true,
  onClick    : null,
};

/**
 * Concentric circles visualization
 * @param {string} selector
 * @param {object=} options
 * @constructor
 */
function ConcentricCircles(selector, options)
{
  if (!selector)
    throw new Error('A `selector` argument is required');

  this.el = document.querySelector(selector);

  // Merge defaults with runtime options
  this.options = extend(DEFAULT_OPTIONS, options);

  this._initialize();
}

/**
 * Intial setup, only happens once
 * @private
 */
ConcentricCircles.prototype._initialize = function()
{
  if (this.el.childNodes.length)
    throw new Error('`el` should be empty at initialization');

  // Allows absolute legend positioning relative to container
  this.el.style.position = 'relative';

  // Set up `svg` container
  this.viz = d3.select(this.el).append('svg');
};

/**
 * Clears out the currently rendered `svg` group and recreates one
 * Can be called as many times as needed
 */
ConcentricCircles.prototype.render = function()
{
  var containerWidth  = this._getContainerWidth();
  var containerHeight = this._getContainerHeight();

  this.viz
    .style('width', containerWidth)
    .style('height', containerHeight);

  this._normalizeDataForRendering();

  // Remove group before creating new one
  d3.select(this.el).select('svg g').remove();

  var group = this._createGroup();
  this._createCircles(group);
  this._createLegend();
};

/**
 * Normalize data values to ensure viz isn't taller than container
 * @private
 */
ConcentricCircles.prototype._normalizeDataForRendering = function()
{
  var containerHeight = this._getContainerHeight();
  this.model.data = normalize(this.model.data, 0, containerHeight / 2, 'value');
};

/**
 * Create and style the group which will house the circles
 * @return {object} D3-wrapped element
 * @private
 */
ConcentricCircles.prototype._createGroup = function()
{
  return this.viz.append('g')
    .attr('transform',
      'translate(' +
        (this._getContainerWidth() / 2) + ',' +
        (this._getContainerHeight() / 2) +
      ')');
};

/**
 * Create and style circles
 * @param {object} group D3-wrapped element
 * @private
 */
ConcentricCircles.prototype._createCircles = function(group)
{
  // Map standalone values to array
  var values = this.model.data.map(function(x) {
    return x.value;
  });

  // The nasty shit
  var _this = this;
  group.selectAll('circle')
    .data(values)
    .enter().append('circle')
    .on('click', function(d, i) {
      if (_this.options.onClick)
        _this.options.onClick(_this.model.originalData[i]);
    })
    .attr('r', function(d) { return d; })
    .attr('fill', function(d, i) {
      var color = _this.options.colors[i];
      _this.model.data[i].color = color;
      return color;
    });
};

/**
 * Create and render legend using Handlebars template and bind the concentric circles instance to it
 * @private
 */
ConcentricCircles.prototype._createLegend = function()
{
  if (!this.options.legend) return;

  var legend = TEMPLATE(this);
  var legendContainer = document.createElement('div');
  legendContainer.classList.add('d3-concentric-circles-legend');
  legendContainer.innerHTML = legend;

  this.el.appendChild(legendContainer);
};

/**
 * Get the width of the container element
 * @return {number}
 * @private
 */
ConcentricCircles.prototype._getContainerWidth = function()
{
  return this.el.clientWidth;
};

/**
 * Get the height of the container element
 * @return {number}
 * @private
 */
ConcentricCircles.prototype._getContainerHeight = function()
{
  return this.el.clientHeight;
};
