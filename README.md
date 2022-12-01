# Uno

#### A single player version of the classic card game Uno. Play against some basic bot logic. 

#### By Yoonis Ali, Teddy Atkinson, Robert Bryan, Robert Onstott

## Technologies Used

* _JavaScript/ node.js_
* _HTML_
* _CSS_
* _Webpack_
* _Node Packet Manager_
* _Babel_
* _ES Lint_

## Description

This single-player card game allows a user to pass some pleasant moments playing the classic card game Uno against some basic programmed logic. At the start of the game, the user and the computer opponent are both dealt 7 cards. The computer cards are rendered face down, and the user cards are rendered face up. The game begins with the user turn. Play a card by clicking it, and if you are not able, then draw a card bit clicking the draw stack in the middle. If you are still unable to play, press the end turn button. Wild cards trigger a pop-up selector where the user can choose a card color. A "call uno" button is enabled when the user is down to two cards. If the user has not pressed the "call uno" button by the start of the computer's turn, then they are dealt two cards. 

## Setup/Installation Requirements

* _Clone the repository from github_
* _Use NPM to install the dependencies_
  `$ npm install`
* _Build the webpack module_
  `$ npm run build`
* _To see the site in a local live server, you can use the webpack liveserver_
  `$ npm run start`

## Known Bugs

* _Occasionally, specific sequences of 'special' cards (wild, reverese, skip, draw 2) can disrupt the turn management function for one turn_

## License

_MIT_

Copyright (c) _Nov 2022_ _Yoonis Ali, Teddy Atkinson, Robert Bryan, Robert Onstott_

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
