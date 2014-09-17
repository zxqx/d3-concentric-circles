module.exports = D3ConcentricCircles;

var d3        = require('d3');
var clone     = require('clone');
var extend    = require('extend');
var normalize = require('normalize-to-range');

d3.concentricCircles = function(selector, data, options) {
  return new D3ConcentricCircles(selector, data, options);
};

var TEMPLATE = require('./legend.hbs');

/**
 * Concentric circles visualization
 * @param {string} selector
 * @param {array} data
 * @param {object=} options
 */
function D3ConcentricCircles(selector, data, options)
{
  if (!selector)
    throw new Error('A `selector` argument is required');
  if (!data)
    throw new Error('A `data` argument is required');

  /**
   * Sane defaults
   */
  this.DEFAULT_OPTIONS = {
    valueField : 'value',
    labelField : 'label',
    colors     : ['#08534c', '#28825f', '#fc8f32', '#dc4f00', '#f60202'],
    legend     : true,
    onClick    : null,
  };

  this.el   = document.querySelector(selector);
  this.data = clone(data);

  /**
   * @private
   */
  this._initialized = false;

  /**
   * Preserve original data hash
   * @private
   */
  this._data = clone(this.data);

  /**
   * Preserve original options hash
   * @private
   */
  this._options = clone(options);

  // Merge defaults with runtime options
  this.options = extend(this.DEFAULT_OPTIONS, options);

  this.initialize();
}

/**
 * Intial setup, only happens once
 */
D3ConcentricCircles.prototype.initialize = function()
{
  if (this._initialized) return;

  if (this.el.childNodes.length)
    throw new Error('`el` should be empty at initialization');

  this._initialized = true;

  // Allows absolute legend positioning relative to container
  this.el.style.position = 'relative';

  this.setLabelAndValueFields();
  this.stackDataValues();

  // Iterate through data in reverse to make rendering simpler
  this.data.reverse();
  this._data.reverse();

  this.viz = d3.select(this.el).append('svg');
  this.render();
};

/**
 * Clears out the currently rendered `svg` group and recreates one
 * Can be called as many times as needed
 */
D3ConcentricCircles.prototype.render = function()
{
  var containerWidth  = this.getContainerWidth();
  var containerHeight = this.getContainerHeight();

  this.viz
    .style('width', containerWidth)
    .style('height', containerHeight);

  // Normalize to ensure viz isn't taller than container
  this.data = normalize(this.data, 0, containerHeight / 2, 'value');

  // Remove group before creating new one
  d3.select(this.el).select('svg g').remove();

  var group = this.createGroup();
  this.createCircles(group);
  this.createLegend();
};

/**
 * Sum each data value with the sum of all previous data values
 * @return {array}
 */
D3ConcentricCircles.prototype.stackDataValues = function()
{
  var sum = 0;
  return this.data.forEach(function(x) {
    sum += x.value;
    x.value = sum;
  });
};

/**
 * Use `labelField` and `valueField` options to set labels and values fields respectively
 * @return {array}
 */
D3ConcentricCircles.prototype.setLabelAndValueFields = function()
{
  var _this = this;
  return this._data.forEach(function(x) {
    x.label = x[_this.options.labelField];
    x.value = x[_this.options.valueField];
  });
};

/**
 * Create and style the group which will house the circles
 * @return {object} D3-wrapped element
 */
D3ConcentricCircles.prototype.createGroup = function()
{
  return this.viz.append('g')
    .attr('transform',
      'translate(' +
        (this.getContainerWidth() / 2) + ',' +
        (this.getContainerHeight() / 2) +
      ')');
};

/**
 * Create and style circles
 * @param {object} group D3-wrapped element
 */
D3ConcentricCircles.prototype.createCircles = function(group)
{
  // Map standalone values to array
  var values = this.data.map(function(x) {
    return x.value;
  });

  // The nasty shit
  var _this = this;
  group.selectAll('circle')
    .data(values)
    .enter().append('circle')
    .on('click', function(d, i) {
      if (_this.options.onClick)
        _this.options.onClick(_this._data[i]);
    })
    .attr('r', function(d) { return d; })
    .attr('fill', function(d, i) {
      var color = _this.options.colors[i];
      _this._data[i].color = color;
      return color;
    });
};

/**
 * Create and render legend using Handlebars template and bind the concentric circles instance to it
 */
D3ConcentricCircles.prototype.createLegend = function()
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
 */
D3ConcentricCircles.prototype.getContainerWidth = function()
{
  return this.el.clientWidth;
};

/**
 * Get the height of the container element
 * @return {number}
 */
D3ConcentricCircles.prototype.getContainerHeight = function()
{
  return this.el.clientHeight;
};

