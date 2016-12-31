angular.module('example').controller('ExampleController',
['$scope', 'Authentication',
  function ($scope, Authentication) {
    // $scope.name = Authentication.user ? Authentication.user.fullName : 'NA: Authentication.user.fullName ';
    $scope.authentication = Authentication;
  }
]);
