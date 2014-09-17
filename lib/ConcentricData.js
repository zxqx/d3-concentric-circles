module.exports = ConcentricData;

var clone = require('clone');

/**
 * Model for concentric circles
 * @param {array} data
 * @param {object} options
 * @constructor
 */
function ConcentricData(data, options)
{
  if (!data)
    throw new Error('A `data` argument is required');

  this.data         = data;
  this.originalData = clone(data);
  this.options      = options;

  this.parse();
}

/**
 * Basic parsing and transforming to prepare data
 */
ConcentricData.prototype.parse = function()
{
  this.setLabelAndValueFields();
  this.stackDataValues();
  this.data.reverse();
  this.originalData.reverse();
};

/**
 * Use `labelField` and `valueField` options to set labels and values fields respectively
 * @return {array}
 */
ConcentricData.prototype.setLabelAndValueFields = function()
{
  var _this = this;
  return this.data.forEach(function(x) {
    x.label = x[_this.options.labelField];
    x.value = x[_this.options.valueField];
  });
};

/**
 * Sum each data value with the sum of all previous data values
 * @return {array}
 */
ConcentricData.prototype.stackDataValues = function()
{
  var sum = 0;
  return this.data.forEach(function(x) {
    sum += x.value;
    x.value = sum;
  });
};
