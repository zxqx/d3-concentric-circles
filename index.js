module.exports = D3ConcentricCircles;

var d3 = require('d3');

function D3ConcentricCircles(el)
{
  /**
   * @private
   */
  this._rendered = false;

  this.el = el;

  this.initialize();
}

D3ConcentricCircles.prototype.initialize = function()
{
  this.render();
};

D3ConcentricCircles.prototype.render = function()
{
  this._rendered = true;

  var svg = d3.select(this.el).append('svg');
  var container = svg.node().parentNode;

  var containerWidth = container.clientWidth;
  var containerHeight = container.clientHeight;

  svg.style('width', containerWidth);
  svg.style('height', containerHeight);

  var bbox = svg[0][0].getBoundingClientRect();

  var numItems = Math.floor(Math.random()*10) + 1;
  var generateValue = d3.random.normal(125, 40);
  var values = [];
  for (var i = 0; i < numItems; i++) {
    values.push(Math.abs(generateValue()));
  }
  values.sort(d3.descending);
  var maxr = d3.max(values);

  var target = svg.append('g')
    .attr('transform', 'translate(' + (bbox.width / 2) + ',' + (bbox.height / 2) + ')');

  var color = d3.scale.category20();
  target.selectAll('circle')
    .data(values)
    .enter().append('circle')
    .attr('r', function(d) {return d;})
    .attr('fill', function(d, i) { return color(i); });
};

// Roll as D3 pluggy
d3.concentricCircles = function(el) {
  new D3ConcentricCircles(el);
};

// Implementation
d3.concentricCircles('.container');
