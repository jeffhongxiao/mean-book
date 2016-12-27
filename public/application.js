var mainApplicationModuleName= 'mean';

var mainApplicationModule = angular.module(mainApplicationModuleName, ['ngRoute', 'example']);

// config hashbang (#!), for better SEO
mainApplicationModule.config(
  ['$locationProvider', function($locationProvider) {
    $locationProvider.hashPrefix('!');
  }]
);

angular.element(document).ready(function() {
  angular.bootstrap(document, [mainApplicationModuleName]);
});
