module.exports = D3ConcentricCircles;

var d3        = require('d3');
var clone     = require('clone');
var normalize = require('normalize-to-range');

d3.concentricCircles = function(el, data, options) {
  new D3ConcentricCircles(el, data, options);
};

function D3ConcentricCircles(el, data, options)
{
  if (!el)
    throw new Error('An `el` argument is required');
  if (!data)
    throw new Error('A `data` argument is required');

  this.el   = document.querySelector(el);
  this.data = data;

  /**
   * @private
   */
  this._data = clone(data);

  /**
   * @private
   */
  this._options = clone(options);

  /**
   * Options
   */
  this.options = options;
  options.colors = this.setColors();

  this.initialize();

  // Debug
  window.viz = this;
}

D3ConcentricCircles.prototype.initialize = function()
{
  if (this.el.childNodes.length)
    throw new Error('`el` should be empty at initialization');

  this.viz = d3.select(this.el).append('svg');
  this.render();
};

D3ConcentricCircles.prototype.render = function()
{
  var containerWidth  = this.getContainerWidth();
  var containerHeight = this.getContainerHeight();

  this.viz
    .style('width', containerWidth)
    .style('height', containerHeight);

  // Debug
  this.data = getRandomValues();
  this.data.sort(function(a, b) {
    return b.value - a.value;
  });
  this._data = clone(this.data);

  // Normalize to ensure viz isn't taller than container
  this.data = normalize(this.data, 0, containerHeight / 2, 'value');

  var group  = this.createGroup();
  var colors = this.options.colors;

  this.createCircles(group, colors);
};

D3ConcentricCircles.prototype.setColors = function()
{
  if (this.options.colors)
    return d3.scale.ordinal().range(this.options.colors);
  else
    return d3.scale.category20();
};

D3ConcentricCircles.prototype.getContainerWidth = function()
{
  return this.el.clientWidth;
};

D3ConcentricCircles.prototype.getContainerHeight = function()
{
  return this.el.clientHeight;
};

D3ConcentricCircles.prototype.createGroup = function()
{
  return this.viz.append('g')
    .attr('transform',
      'translate(' +
        (this.getContainerWidth() / 2) + ',' +
        (this.getContainerHeight() / 2) +
      ')');
};

D3ConcentricCircles.prototype.createCircles = function(group, colors)
{
  var values = this.data.map(function(x) {
    return x.value;
  });

  var _this = this;
  group.selectAll('circle')
    .data(values)
    .enter().append('circle')
    .on('click', function(val, index) {
      _this.options.onClick(_this._data[index]);
    })
    .attr('r', function(d) { return d; })
    .attr('fill', function(d, i) { return colors(i); });
};

function getRandomValues()
{
  var generateValue = d3.random.normal(125, 40);

  var data = [];
  for (var i = 0; i < 6; i++) {
    data.push({ value: Math.abs(generateValue()) });
  }

  return data;
}
