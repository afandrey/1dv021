/**
 * Module for obtaining descriptive information about a set of data.
 *
 * @author afandrey
 * @version 1.0.0
 */

'use strict';

/**
 * Returns the descriptive information (max, mean, median, min, mode and range) from a set of numbers.
 *
 * @param {Array.<Number>} data The set of data to be analyzed.
 * @throws {TypeError} Argument must be an array.
 * @throws {Error} Argument can not be an empty array.
 * @returns {{max: Number, mean: Number, median: Number, min: Number, mode: Array.<Number>, range: Number}}
 */

exports.analyze = function(data) {

      if (!Array.isArray(data)) {
        throw new TypeError('not an array.');
      } else if (data.length === 0) {
          throw new Error('empty');
      }

      return {
        max: maximum(data),
        mean: mean(data),
        median: median(data),
        min: minimum(data),
        mode: mode(data),
        range: range(data)
      };
};

let maximum = function(data) {
  return Math.max.apply(null, data);
};

let mean = function(data) {
  let sum = 0;
  for (let i = 0; i < data.length; i++) {
    sum += data[i];
  }
  return sum / data.length;
};

let median = function(data) {
  let data2 = data.slice();
  data2.sort(function(a, b) {
    return a - b;
  });
  let middle = Math.floor(data2.length / 2);
    if (data2.length % 2 !== 0) {
      return  data2[middle];
  }
  else {
    return (data2[middle - 1] + data2[middle]) / 2.0;
  }
};

let minimum = function(data) {
  return Math.min.apply(null, data);
};

// got help from a friend since I found this being very hard...
let mode = function(data) {
  let data1 = data.slice();
    data1.sort(function(a, b) {
      return a - b;
  });
  let mode = {},
    highestOccurrence = 0,
      modes = [];
  data1.forEach(function(element) {
    if (mode[element] === undefined) {
      mode[element] = 1;
    } else {
      mode[element]++;
    }
    if (mode[element] > highestOccurrence) {
      modes = [element];
        highestOccurrence = mode[element];
    } else if (mode[element] === highestOccurrence) {
      modes.push(element);
        highestOccurrence = mode[element];
    }
  });
  return modes;
};

let range = function(data) {
  let max = maximum(data);
  let min = minimum(data);
    return max - min;
};
