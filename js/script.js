$(function() {

  function randomString() {
    var chars = '0123456789abcdefghiklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXTZ';
    var str = '';
    for (var i = 0; i < 10; i++) {
      str += chars[Math.floor(Math.random() * chars.length)];
    }
    return str;
  }

  function Column(name) {
    var self = this;
    this.id = randomString();
    this.name = name;
    this.$element = createColumn();

    function createColumn() {
      var $column = $('<div>').addClass('column');
      var $columnTitle = $('<h2>').addClass('column-title').text(self.name);
      var $columnCardList = $('<ul>').addClass('column-card-list');
      var $columnDelete = $('<button>').addClass('btn-delete').text('X');
      var $columnAddCard = $('<button>').addClass('add-card').text('Add a card!');
      
      $columnDelete.on('click', function() {
        self.removeColumn();
      });
      $columnAddCard.on('click', function() {
        self.addCard(new Card(prompt('Enter card name:')));
      });
      
      $column.append($columnTitle)
              .append($columnDelete)
              .append($columnAddCard)
              .append($columnCardList);
      return $column;
    }
  }

  Column.prototype = {
    addCard: function(card) {
      this.$element.children('ul').append(card.$element);
    },
    removeColumn: function() {
      this.$element.remove();
    }
  };

  function Card(name) {
    var self = this;
    this.id = randomString();
    this.name = name;
    this.$element = createCard();

    function createCard() {
      var $card = $('<li>').addClass('card');
      var $cardName = $('<p>').addClass('card-name')
      .text(self.name);
      var $cardDelete = $('<button>').addClass('btn-delete').text('X');
      $cardDelete.on('click', function() {
        self.removeCard();
      });
      $card.append($cardDelete)
            .append($cardName);
      return $card;
    }
  }

  Card.prototype = {
    removeCard: function() {
      this.$element.remove();
    }
  }

  $(function addDrop() {
    $('.card').draggable({
      containment: "document",
      drop: function(event, ui) {
      }
    });
  });
    
  var board = {
      name: 'Kanban Board',
      addColumn: function(column) {
        this.$element.append(column.$element);
        initSortable();
      },
      $element: $('#board .column-container')
  };

  function initSortable() {
    $('.column-card-list').sortable({
      connectWith: '.column-card-list',
      placeholder: 'card-placeholder'
    }).disableSelection();
  }

  $('.create-column')
    .on('click', function(){
    var name = prompt('Enter a column name');
    var column = new Column(name);
        board.addColumn(column);
    });

  var todoColumn = new Column('Magic to do:');
  var doingColumn = new Column('Magic in progress:');
  var doneColumn = new Column('Magic done:');

  board.addColumn(todoColumn);
  board.addColumn(doingColumn);
  board.addColumn(doneColumn);

  var card1 = new Card('New task');
  var card2 = new Card('Create kanban boards');

  todoColumn.addCard(card1);
  doingColumn.addCard(card2);

});