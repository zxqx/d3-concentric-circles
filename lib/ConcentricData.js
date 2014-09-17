module.exports = ConcentricData;

var clone = require('clone');

/**
 * Model for concentric circles
 * @param {array} data
 * @param {object} options
 */
function ConcentricData(data, options)
{
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
  this.stackDataValues();
  this.setLabelAndValueFields();
  this.data.reverse();
  this.originalData.reverse();
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
