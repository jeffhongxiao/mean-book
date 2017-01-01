angular.module('articles').factory('Articles',
  ['$resource',
  function($resource) {
    var foo = $resource('api/articles/:articleId',
        {articleId: '@_id'},
        {update: {method: 'PUT'}});

    return foo;
}]);
