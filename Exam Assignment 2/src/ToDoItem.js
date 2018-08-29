/**
 * Module for ToDoItem.
 *
 * @author afandrey
 * @version 1.16.0
 */

'use strict';

/**
 * @param {string} text - sets or gets the text to the item
 * @param {Number} dueDate - sets or gets the dueDate to the item
 * @param {Number} finishedDate - sets or gets the finishedDate to the item
 * @constructor
 */

function ToDoItem(text, dueDate, finishedDate) {

  /**
   * The ToDoItem's text
   * @private
   * @type {string}
   */

  let _text;

  /**
   * The ToDoItem's dueDate
   * @private
   * @type {Number}
   */

  let _dueDate;

  /**
   * The ToDoItem's finishedDate
   * @private
   * @type {Number}
   */

  let _finishedDate;


  /**
   * Gets or sets the ToDoItem's text and throws Error if it's not a string, empty string and too long.
   * @public
   * @type {string}
   * @name ToDoItem#text
   */

  Object.defineProperty(this, 'text', {
    enumerable: true,
    get: function() {
      return _text;
    },
    set: function(text) {
      if (typeof text !== 'string') {
        throw new TypeError('not a string');
      } else if (text.length === 0) {
        throw new Error('empty string');
      } else if (text.length > 50) {
        throw new Error('string is too long');
      }
      _text = text;
    }
  });

  /**
   * Gets or sets the ToDoItem's dueDate and throws Error if it's a non-valid Date Object
   * @public
   * @type {number}
   * @name ToDoItem#dueDate
   */

  Object.defineProperty(this, 'dueDate', {
    enumerable: true,
    get: function() {
      return new Date(_dueDate);
    },
    set: function(dueDate) {
      if (dueDate instanceof Date === false) {
        throw new TypeError('invalid date');
      }
      _dueDate = new Date(dueDate);
    }
  });

  /**
   * Gets or sets the ToDoItem's finishedDate and throws Error if it's a non-valid Date Object
   * @public
   * @type {number}
   * @name ToDoItem#finishedDate
   * checks if _finishedDate is undefined or a Date-object before get returns anything
   */

  Object.defineProperty(this, 'finishedDate', {
    enumerable: true,
    get: function() {
      return _finishedDate ? new Date(_finishedDate) : undefined;
    },
    set: function(finishedDate) {
      if (typeof finishedDate !== 'undefined') {
        if(!(finishedDate instanceof Date) || Number.isNaN(finishedDate)) {
          throw new TypeError('The value must be a valid date or undefined.');
        }
        finishedDate = new Date(finishedDate);
      }
      _finishedDate = finishedDate;
    }
  });

  Object.defineProperty(this, 'isDone', {
    enumerable: true,
    get: function() {
      if (_finishedDate !== undefined) {
      return true;
      } else {
        return false;
      }
    }
  });

  Object.defineProperty(this, 'isOverdue', {
    enumerable: true,
    get: function() {
      if (_finishedDate > _dueDate) {
        return true;
      } else {
        return false;
      }
    }
  });

  /**
   * Initialize the private properties through setters
   */

  this.text = text;
  this.dueDate = dueDate;
  this.finishedDate = finishedDate;
}

ToDoItem.prototype.clone = function() {
  return new ToDoItem(this.text, this.dueDate, this.finishedDate);
};

ToDoItem.prototype.toJson = function() {
  return JSON.stringify(this);
};

ToDoItem.prototype.toString = function() {
  if (this.finishedDate === undefined) {
    return '  ' + this.text + ' ' + this.dueDate.toLocaleDateString();
  } else if (this.isOverdue) {
    return '* ' + this.text  + ' ' + this.dueDate.toLocaleDateString() + ' ' + this.finishedDate.toLocaleDateString();
  } else if (this.finishedDate !== undefined) {
    return '  ' + this.text + ' ' + this.dueDate.toLocaleDateString() + ' ' + this.finishedDate.toLocaleDateString();
  }
};

/**
*  Exports.
*/

module.exports = ToDoItem;
