/**
 * Module for the Deck.
 *
 * @author afandrey
 * @version 1.16.0
 */

'use strict';

const Hand = require('./Hand');
const Deck = require('./Deck');

/**
 * @constructor
 */

function Game() {

  let deck = new Deck();
  deck.shuffle();

  /**
   * sets up players hand and dealers hand
   */

  let playerHand = new Hand();
  let dealerHand = new Hand();

  playerHand.addCard(deck.deal());
  playerHand.addCard(deck.deal());
  dealerHand.addCard(deck.deal());
  dealerHand.addCard(deck.deal());

  this.displayPlayer = function() {
    if (dealerHand.score() === 21) {
      return 'Player: ' + playerHand.printHand() + ' (' +
        playerHand.score() + ')';
    } else if (playerHand.score() <= 15) {
      while (playerHand.getHand().length < 5 && playerHand.score() <= 19) {
        playerHand.addCard(deck.deal());
      }
    }
    return 'Player: ' + playerHand.printHand() + ' (' +
      playerHand.score() + ')';
  };

  this.displayDealer = function() {
    if (playerHand.score() > 21 || playerHand.score() === 21 ||
      playerHand.score() < 21 && playerHand.getHand().length === 5) {
      return 'Dealer: -';
    } else if (dealerHand.score() <= 15) {
      while (dealerHand.getHand().length < 5 && dealerHand.score() <= 19) {
        dealerHand.addCard(deck.deal());
      }
    }
    return 'Dealer: ' + dealerHand.printHand() + ' (' +
      dealerHand.score() + ')';
  };

  /**
   * sets the "rules" of the game.
   */

  this.results = function() {
    if (dealerHand.score() === 21 && dealerHand.getHand().length === 2) {
      return 'Blackjack! Dealer wins';
    } else if (playerHand.score() === 21 && playerHand.getHand().length === 2) {
      if (dealerHand.score() === 21 && dealerHand.getHand().length === 2) {
        return 'Both blackjacks! You tie!';
      } else {
        return 'Blackjack! Player wins.';
      }
    } else if (dealerHand.score() === 21 &&
      dealerHand.getHand() === 2) {
      return 'Blackjack. Dealer wins.';
    } else if (playerHand.score() > 21) {
      return 'Player busted. Dealer wins.';
    } else if (dealerHand.score() > 21) {
      return 'Dealer busted. Player wins.';
    } else if (dealerHand.score() > playerHand.score() ||
      dealerHand.score() === playerHand.score()) {
      return 'Dealer wins.';
    } else {
      return 'Player wins.';
    }
  };
}

/**
 * @returns {string} - A string that displays the cards, score and the winner.
 */

Game.prototype.toString = function() {
  return this.displayPlayer() + '\n' +
    this.displayDealer() + '\n' + this.results();
};

module.exports = Game;
