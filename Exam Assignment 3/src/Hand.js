/**
 * Module for Player.
 *
 * @author afandrey
 * @version 1.16.0
 */

'use strict';

function Hand() {
  this.cards = [];

  this.getHand = function() {
    return this.cards;
  };

  /**
   * Checks if the cardsDealt contains any aces.
   * If it does and totalScore is over 21 reduce totalScore with 13 points and reduce aces count by 1.
   * Now aces can be worth 1 or 14 points.
   */

  this.score = function() {
    let i;
    let score = 0;
    let cardVal = 0;
    let aces = 0;

    for (i = 0; i < this.cards.length; i++) {
      cardVal = this.cards[i].getNumericValue();
      if (cardVal === 14) {
        aces += 1;
      }
      score += cardVal;
    }
    while (score > 21 && aces > 0) {
      score -= 13;
      aces -= 1;
    }
    return score;
  };

  this.printHand = function() {
    let arrayOut = [];

    for (let i = 0; i < this.cards.length; i++) {
      arrayOut.push(this.cards[i].getName());
    }
    return arrayOut.join();
  };
}

Hand.prototype.addCard = function(card) {
  this.cards.push(card);
};

module.exports = Hand;
