(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
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

},{"d3":"d3"}]},{},[1])
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi9Vc2Vycy96YW5nZWxsZS9TaXRlcy9kMy1jb25jZW50cmljLWNpcmNsZXMvbm9kZV9tb2R1bGVzL2Jyb3dzZXJpZnkvbm9kZV9tb2R1bGVzL2Jyb3dzZXItcGFjay9fcHJlbHVkZS5qcyIsIi9Vc2Vycy96YW5nZWxsZS9TaXRlcy9kMy1jb25jZW50cmljLWNpcmNsZXMvaW5kZXguanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7QUNBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSIsImZpbGUiOiJnZW5lcmF0ZWQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlc0NvbnRlbnQiOlsiKGZ1bmN0aW9uIGUodCxuLHIpe2Z1bmN0aW9uIHMobyx1KXtpZighbltvXSl7aWYoIXRbb10pe3ZhciBhPXR5cGVvZiByZXF1aXJlPT1cImZ1bmN0aW9uXCImJnJlcXVpcmU7aWYoIXUmJmEpcmV0dXJuIGEobywhMCk7aWYoaSlyZXR1cm4gaShvLCEwKTt2YXIgZj1uZXcgRXJyb3IoXCJDYW5ub3QgZmluZCBtb2R1bGUgJ1wiK28rXCInXCIpO3Rocm93IGYuY29kZT1cIk1PRFVMRV9OT1RfRk9VTkRcIixmfXZhciBsPW5bb109e2V4cG9ydHM6e319O3Rbb11bMF0uY2FsbChsLmV4cG9ydHMsZnVuY3Rpb24oZSl7dmFyIG49dFtvXVsxXVtlXTtyZXR1cm4gcyhuP246ZSl9LGwsbC5leHBvcnRzLGUsdCxuLHIpfXJldHVybiBuW29dLmV4cG9ydHN9dmFyIGk9dHlwZW9mIHJlcXVpcmU9PVwiZnVuY3Rpb25cIiYmcmVxdWlyZTtmb3IodmFyIG89MDtvPHIubGVuZ3RoO28rKylzKHJbb10pO3JldHVybiBzfSkiLCJtb2R1bGUuZXhwb3J0cyA9IEQzQ29uY2VudHJpY0NpcmNsZXM7XG5cbnZhciBkMyA9IHJlcXVpcmUoJ2QzJyk7XG5cbmZ1bmN0aW9uIEQzQ29uY2VudHJpY0NpcmNsZXMoZWwpXG57XG4gIC8qKlxuICAgKiBAcHJpdmF0ZVxuICAgKi9cbiAgdGhpcy5fcmVuZGVyZWQgPSBmYWxzZTtcblxuICB0aGlzLmVsID0gZWw7XG5cbiAgdGhpcy5pbml0aWFsaXplKCk7XG59XG5cbkQzQ29uY2VudHJpY0NpcmNsZXMucHJvdG90eXBlLmluaXRpYWxpemUgPSBmdW5jdGlvbigpXG57XG4gIHRoaXMucmVuZGVyKCk7XG59O1xuXG5EM0NvbmNlbnRyaWNDaXJjbGVzLnByb3RvdHlwZS5yZW5kZXIgPSBmdW5jdGlvbigpXG57XG4gIHRoaXMuX3JlbmRlcmVkID0gdHJ1ZTtcblxuICB2YXIgc3ZnID0gZDMuc2VsZWN0KHRoaXMuZWwpLmFwcGVuZCgnc3ZnJyk7XG4gIHZhciBjb250YWluZXIgPSBzdmcubm9kZSgpLnBhcmVudE5vZGU7XG5cbiAgdmFyIGNvbnRhaW5lcldpZHRoID0gY29udGFpbmVyLmNsaWVudFdpZHRoO1xuICB2YXIgY29udGFpbmVySGVpZ2h0ID0gY29udGFpbmVyLmNsaWVudEhlaWdodDtcblxuICBzdmcuc3R5bGUoJ3dpZHRoJywgY29udGFpbmVyV2lkdGgpO1xuICBzdmcuc3R5bGUoJ2hlaWdodCcsIGNvbnRhaW5lckhlaWdodCk7XG5cbiAgdmFyIGJib3ggPSBzdmdbMF1bMF0uZ2V0Qm91bmRpbmdDbGllbnRSZWN0KCk7XG5cbiAgdmFyIG51bUl0ZW1zID0gTWF0aC5mbG9vcihNYXRoLnJhbmRvbSgpKjEwKSArIDE7XG4gIHZhciBnZW5lcmF0ZVZhbHVlID0gZDMucmFuZG9tLm5vcm1hbCgxMjUsIDQwKTtcbiAgdmFyIHZhbHVlcyA9IFtdO1xuICBmb3IgKHZhciBpID0gMDsgaSA8IG51bUl0ZW1zOyBpKyspIHtcbiAgICB2YWx1ZXMucHVzaChNYXRoLmFicyhnZW5lcmF0ZVZhbHVlKCkpKTtcbiAgfVxuICB2YWx1ZXMuc29ydChkMy5kZXNjZW5kaW5nKTtcbiAgdmFyIG1heHIgPSBkMy5tYXgodmFsdWVzKTtcblxuICB2YXIgdGFyZ2V0ID0gc3ZnLmFwcGVuZCgnZycpXG4gICAgLmF0dHIoJ3RyYW5zZm9ybScsICd0cmFuc2xhdGUoJyArIChiYm94LndpZHRoIC8gMikgKyAnLCcgKyAoYmJveC5oZWlnaHQgLyAyKSArICcpJyk7XG5cbiAgdmFyIGNvbG9yID0gZDMuc2NhbGUuY2F0ZWdvcnkyMCgpO1xuICB0YXJnZXQuc2VsZWN0QWxsKCdjaXJjbGUnKVxuICAgIC5kYXRhKHZhbHVlcylcbiAgICAuZW50ZXIoKS5hcHBlbmQoJ2NpcmNsZScpXG4gICAgLmF0dHIoJ3InLCBmdW5jdGlvbihkKSB7cmV0dXJuIGQ7fSlcbiAgICAuYXR0cignZmlsbCcsIGZ1bmN0aW9uKGQsIGkpIHsgcmV0dXJuIGNvbG9yKGkpOyB9KTtcbn07XG5cbi8vIFJvbGwgYXMgRDMgcGx1Z2d5XG5kMy5jb25jZW50cmljQ2lyY2xlcyA9IGZ1bmN0aW9uKGVsKSB7XG4gIG5ldyBEM0NvbmNlbnRyaWNDaXJjbGVzKGVsKTtcbn07XG5cbi8vIEltcGxlbWVudGF0aW9uXG5kMy5jb25jZW50cmljQ2lyY2xlcygnLmNvbnRhaW5lcicpO1xuIl19
