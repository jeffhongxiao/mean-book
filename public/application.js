var mainApplicationModuleName= 'mean';

var mainApplicationModule = angular.module(mainApplicationModuleName, ['ngResource', 'ngRoute', 'users', 'example',
'articles', 'chat']);

mainApplicationModule.config(
  ['$locationProvider', function($locationProvider) {
    // XXX config hashbang (#!), for better SEO
    $locationProvider.hashPrefix('!');
  }]
);

// XXX fix Facebook oauth bug
if (window.location.hash === '#_=_')
 window.location.hash = '#!';

angular.element(document).ready(function() {
  angular.bootstrap(document, [mainApplicationModuleName]);
});
