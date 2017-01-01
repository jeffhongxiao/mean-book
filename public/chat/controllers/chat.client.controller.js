angular.module('chat').controller('ChatController', [
  '$scope', 'Socket',
  function($scope, Socket) {
    $scope.message = [];

    Socket.on('chatMessage', function(message) {
      $scope.messages.push(message);
    });

    $scope.sendMessage = function() {
      var message = {
        text: this.messageText,
      };

      Socket.emit('chatMessage', message);

      this.messageText = '';
    };

    $scope.$on('$destroy', function() {
      Socket.removeListenser('chatMessage');
    });
  }
]);
