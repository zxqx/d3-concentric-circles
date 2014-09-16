module.exports = D3ConcentricCircles;

var d3        = require('d3');
var clone     = require('clone');
var normalize = require('normalize-to-range');

d3.concentricCircles = function(el, data, options) {
  new D3ConcentricCircles(el, data, options);
};

D3ConcentricCircles.TEMPLATE = require('./legend.hbs');
D3ConcentricCircles.DEFAULT_COLORS = ['#485566', '#259eae', '#cdfc43', '#576e4a', '#8cd34b'];

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
  //window.viz = this;
}

D3ConcentricCircles.prototype.initialize = function()
{
  if (this.el.childNodes.length)
    throw new Error('`el` should be empty at initialization');

  this.el.style.position = 'relative';

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

  // Remove group before creating new one
  d3.select(this.el).select('svg g').remove();

  var group  = this.createGroup();
  var colors = this.options.colors;

  this.createCircles(group, colors);
  this.createLegend();
};

D3ConcentricCircles.prototype.createLegend = function()
{
  var legend = D3ConcentricCircles.TEMPLATE(this);
  var legendContainer = document.createElement('div');
  legendContainer.classList.add('d3-concentric-circles-legend');
  legendContainer.innerHTML = legend;

  this.el.appendChild(legendContainer);
};

D3ConcentricCircles.prototype.setColors = function()
{
  return d3.scale.ordinal().range(this.options.colors || D3ConcentricCircles.DEFAULT_COLORS);
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
    .on('click', function(d, i) {
      _this.options.onClick(_this._data[i]);
    })
    .attr('r', function(d) { return d; })
    .attr('fill', function(d, i) {
      var color = colors(i);
      _this._data[i].color = color;
      return color;
    });
};

function getRandomValues()
{
  var generateValue = d3.random.normal(125, 40);

  var data = [];
  for (var i = 0; i < 5; i++) {
    data.push({ display: 'Item Name', value: Math.abs(generateValue()) });
  }

  return data;
}
