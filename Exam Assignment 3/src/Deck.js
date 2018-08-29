/**
 * Module for Cards.
 *
 * @author afandrey
 * @version 1.16.0
 */

'use strict';
const Card = require('./Card');

function Deck() {
  this.cards = [];
  this.deck = [];

  let num = ['14', '2', '3', '4', '5', '6', '7', '8', '9',
    '10', '11', '12', '13'];
  let suit = ['♥', '♦', '♣', '♠'];

  this.deck = new Array(52);

  for (let i = 0; i < 4; i++) {
    for (let j = 0; j < 13; j++) {
      this.deck[i * num.length + j] = new Card(num[j], suit[i]);
    }
  }
}

Deck.prototype.shuffle = function() {
  for (let i = 51; i > 0; i--) {
    let r = Math.floor((i + 1) * Math.random(i));
    let temp = this.deck[r];
    this.deck[r] = this.deck[i];
    this.deck[i] = temp;
  }
};

Deck.prototype.deal = function() {
  if (this.deck.length > 0) {
    return this.deck.shift();
  } else {
    return null;
  }
};

module.exports = Deck;
