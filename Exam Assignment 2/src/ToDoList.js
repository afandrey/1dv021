/**
 * Module for ToDoList.
 *
 * @author afandrey
 * @version 1.16.0
 */

'use strict';

/**
 *
 * @param {string} name - sets or gets name on the list
 * @param {string} color - sets or gets color on the list
 * @param {Array} toDoItems - sets or gets an array containing references to ToDoItem objects
 * @constructor
 */

function ToDoList(name, color = 'yellow', toDoItems = []) {
  let _name;
  let _color;
  let _toDoItems;

  Object.defineProperty(this, 'name', {
    enumerable: true,
    get: function() {
      return _name;
    },
    set: function(name) {
      if (typeof name !== 'string') {
        throw new TypeError('not a string');
      } else if (name.length === 0) {
        throw new Error('empty string');
      } else if (name.length > 30) {
        throw new Error('string is too long');
      }
      _name = name;
    }
  });

  Object.defineProperty(this, 'color', {
    enumerable: true,
    get: function() {
      return _color;
    },
    set: function(color) {
      if (typeof color !== 'string') {
        throw new TypeError('not a string');
      } else if (color.length === 0) {
        throw new Error('empty string');
      } else if (color.length > 20) {
        throw new Error('string is too long');
      }
      _color = color;
    }
  });

  Object.defineProperty(this, 'toDoItems', {
    enumerable: true,
    get: function() {
      return _toDoItems.map(x => x.clone());
    },
    set: function(toDoItems) {
      if (!Array.isArray(toDoItems)) {
        throw new TypeError('not an array.');
      }
      _toDoItems = toDoItems.map(x => x.clone()).sort(function (a,b) {
        return a.dueDate - b.dueDate;
      });
    }
  });

  Object.defineProperty(this, 'hasOverdue', {
    enumerable: true,
    get: function() {
        for (let i = 0; i < _toDoItems.length; i++) {
         if (_toDoItems[i].isOverdue) {
           return true;
         }
        }
        return false;
    }
  });

  this.name = name;
  this.color = color;
  this.toDoItems = toDoItems;
}

ToDoList.prototype.add = function(toDoItems) {
  let copy = this.toDoItems;

  copy.push(toDoItems);

  this.toDoItems = copy;
};

ToDoList.prototype.removeFinished = function() {
  let copy = this.toDoItems;
  let i;

  for (i = 0; i < copy.length; i++) {
    if (copy[i].isDone === true) {
      copy.splice(i, 1);
    }
  }
  this.toDoItems = copy;
};

ToDoList.prototype.clone = function() {
  return new ToDoList(this.name, this.color, this.toDoItems);
};

ToDoList.prototype.toJson = function() {
  return JSON.stringify(this);
};

ToDoList.prototype.toString = function() {
  let result = this.name;
   if (this.hasOverdue) {
    result += ' *\n' + this.toDoItems;
  } else {
    result += '\n';
   }

   for (let i = 0; i < this.toDoItems.length; i++) {
     if (this.toDoItems === 0) {
       result += '\n';
     }
   }
  return result;
};

/**
*  Exports.
*/

module.exports = ToDoList;
