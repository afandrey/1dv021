// jscs:disable jsDoc
/**
 * Module for Cards.
 *
 * @author afandrey
 * @version 1.16.0
 */

'use strict';
/**
 * @param {number} suit - returns the Cards suit
 * @param {number} num - returns the Cards number
 * @constructor
 */

function Card(num, suit) {
  this.suit = suit;
  this.num = num;

  this.getNumber = function() {
    if (this.num === '14') {
      return 'A';
    } else if (this.num === '13') {
      return 'K';
    } else if (this.num === '12') {
      return 'Q';
    } else if (this.num === '11') {
      return 'J';
    } else {
      return this.num;
    }
  };
}

Card.prototype.getName = function() {
  return this.suit + this.getNumber();
};

Card.prototype.getNumericValue = function() {
  return parseInt(this.num);
};

module.exports = Card;
