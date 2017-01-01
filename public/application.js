var mainApplicationModuleName= 'mean';

var mainApplicationModule = angular.module(mainApplicationModuleName, ['ngResource', 'ngRoute', 'users', 'example',
'articles']);

mainApplicationModule.config(
  ['$locationProvider', function($locationProvider) {
    // XXX config hashbang (#!), for better SEO
//    $locationProvider.hashPrefix('!');

    // XXX use html5mode if possible
    // ref: http://stackoverflow.com/a/38772825/3380951
    if (window.history && window.history.pushState) {
      console.log("locationProvider uses: html5Mode");
      // $locationProvider.html5Mode({
      //     enabled: true,
      //     requireBase: true,
      //     rewriteLinks: false
      // });
      $locationProvider.html5Mode(true);
    }
    else {
      console.log("locationProvider uses: hashbang");
      $locationProvider.html5Mode(false);
    }
  }]
);

// fix Facebook oauth bug
//if (window.location.hash === '#_=_')
//  window.location.hash = '#!';

angular.element(document).ready(function() {
  angular.bootstrap(document, [mainApplicationModuleName]);
});
