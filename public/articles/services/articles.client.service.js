angular.module('articles').factory('Articles',
  ['$resource',
  function($resource) {
    var foo = $resource('api/article/:articleId',
        {articleId: '@_id'},
        {update: {method: 'PUT'}});

    return foo;
}]);
