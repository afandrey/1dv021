/**
 * Starting  point of the application.
 *
 * @fileOverview Creating the game "twenty one".
 * @author afandrey
 * @version 1.16.0
 */

'use strict';

const Game = require('./src/Game');

let firstGame = new Game();
console.log(firstGame.toString());

