const expect = require('chai').expect;
const d3 = require('d3');
const d3ConcentricCircles = require('../index.js');

var container;

describe('basics', () => {
  before(() => {
    container = document.createElement('div');
    container.classList.add('container');
    document.body.appendChild(container);
  });

  after(() => {
    document.body.removeChild(container);
  });

  var data = [
    { label: 'Label', value: 100 },
    { label: 'Label 2', value: 132 },
  ];

  var options = {
    valueField : 'val',
    labelField : 'lab',
    colors     : ['#fff', '#ccc', '#000'],
    legend     : false,
    onClick    : function(e) {
      console.log(e);
    }
  };

  it('should throw when selector is not provided', () => {
    expect(() => d3ConcentricCircles(null, data)).to.throw(Error);
  });

  it('should throw when data is not provided', () => {
    expect(() => d3ConcentricCircles('body')).to.throw(Error);
  });

  it('should throw if container element is not empty', () => {
    expect(() => d3ConcentricCircles('body')).to.throw(Error);
  });

  it('should merge runtime options with defaults', () => {
    var cc = d3ConcentricCircles('.container', data, options);
    expect(options).to.eql(cc.options);
  });
});
