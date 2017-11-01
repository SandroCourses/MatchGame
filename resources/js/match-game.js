var MatchGame = {};

/*
  Sets up a new game after HTML document has loaded.
  Renders a 4x4 board of cards.
*/

$( document ).ready(function() {
  var cardValues = MatchGame.generateCardValues();
  var $game = $('#game');

  MatchGame.renderCards(cardValues, $game);
});

/*
  Generates and returns an array of matching card values.
 */

MatchGame.generateCardValues = function () {
  var cardNumbersSeq = [];
  var cardNumbersRandom = [];
  for(var i = 1; i <= 8; i++) {
    cardNumbersSeq.push(i);
    cardNumbersSeq.push(i);
  }

  while(cardNumbersSeq.length !== 0) {
    var randomNumber = Math.random() * (cardNumbersSeq.length);
    var randomInteger = Math.floor(randomNumber);

    cardNumbersRandom.push(cardNumbersSeq[randomInteger]);
    cardNumbersSeq.splice(randomInteger, 1);
  }

  return cardNumbersRandom;
};

/*
  Converts card values to jQuery card objects and adds them to the supplied game
  object.
*/

MatchGame.renderCards = function(cardValues, $game) {
  $game.data('flippedCards', []);

  var hslValues = ['hsl(25, 85%, 65%)',
    'hsl(55, 85%, 65%)',
    'hsl(90, 85%, 65%)',
    'hsl(160, 85%, 65%)',
    'hsl(220, 85%, 65%)',
    'hsl(265, 85%, 65%)',
    'hsl(310, 85%, 65%)',
    'hsl(360, 85%, 65%)'];

  $game.empty();
  $gameRow = $('<div class="row"></div>');

  for(var i = 0; i < cardValues.length; i++) {
    var $card = $('<div class="card col-xs-3"></div>');
    $card.data('value', cardValues[i]);
    $card.data('flipped', false);
    $card.data('color', hslValues[cardValues[i]-1]);
    $gameRow.append($card);
    $game.append($gameRow);
  }

  $('.card').click(function() {
    MatchGame.flipCard($(this), $game);
  });
};

/*
  Flips over a given card and checks to see if two cards are flipped over.
  Updates styles on flipped cards depending whether they are a match or not.
 */

MatchGame.flipCard = function($card, $game) {
  var flipped = $card.data('flipped');
  if(flipped) {
    return;
  } else {
    $card.css('background-color', $card.data('color'));
    $card.text($card.data('value'));
    $card.data('flipped', true);

    $game.data('flippedCards').push($card);

    if($game.data('flippedCards').length === 2) {
      var flippedCard1 = $game.data('flippedCards')[0];
      var flippedCard2 = $game.data('flippedCards')[1];

      if(flippedCard1.data('value') === flippedCard2.data('value')) {
        flippedCard1.css('background-color', 'rgb(153, 153, 153)');
        flippedCard2.css('background-color', 'rgb(153, 153, 153)');

        flippedCard1.css('color', 'rgb(204, 204, 204)');
        flippedCard2.css('color', 'rgb(204, 204, 204)');
      } else {
        setTimeout(function() {
          flippedCard1.css('background-color', 'rgb(32, 64, 86)');
          flippedCard2.css('background-color', 'rgb(32, 64, 86)');

          flippedCard1.text('');
          flippedCard2.text('');

          flippedCard1.data('flipped', false);
          flippedCard2.data('flipped', false);
        }, 1000);
      }

      $game.data('flippedCards', []);
    }
  }
};
