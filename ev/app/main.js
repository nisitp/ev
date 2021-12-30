// main.js
// August 29, 2016
// Alexander Rhett Crammer
// Hot Sauce
var app = angular.module('evRevolution', ['ngRoute', 'uiSwitch'])

.run(function ($rootScope, $location, $route) {
  $rootScope.currentYear = new Date().getFullYear();
  $rootScope.extraStylesheets = [];
  $rootScope.extraScripts = [];
  $rootScope.currentPath = $location.path();
  $rootScope.viewportWidth = ($(window).width() <= 768) ? 'phone' : 'tablet';
  $rootScope.$on('$viewContentLoaded', function () {
    // Reinitialize the Hype scenes
    // It's very important not to mix these two
    // together else weird things will happen
    if ($rootScope.viewportWidth == 'phone') {
      $.getScript('/phone/phone.hyperesources/phone_hype_generated_script.js')
        .done(function () {console.log('loaded script');})
        .fail(function () {console.log('failed to load script');});
      $.getScript('/phone2/phone2.hyperesources/phone2_hype_generated_script.js')
        .done(function () {console.log('loaded script');})
        .fail(function () {console.log('failed to load script');});
    } else if ($rootScope.viewportWidth == 'tablet') {
      $.getScript('/tablet/tablet.hyperesources/tablet_hype_generated_script.js')
        .done(function () {console.log('loaded script');})
        .fail(function () {console.log('failed to load script');});
      $.getScript('/tablet2/tablet2.hyperesources/tablet2_hype_generated_script.js')
        .done(function () {console.log('loaded script');})
        .fail(function () {console.log('failed to load script');});
    }

    // Update the title of the page
    if ($route.current.title) {
      document.title = $route.current.title + ' | Join the rEVolution';
    } else {
      document.title = 'Join the rEVolution';
    }
  });
})

.config(function ($routeProvider, $locationProvider) {
  $routeProvider.when('/', {
    controller: 'WelcomeController',
    templateUrl: '/templates/welcome.html',
    title: ''
  })
  .when('/affordable', {
    controller: 'AffordableController',
    templateUrl: '/templates/affordable.html',
    title: 'Electric Vehicle Owners Enjoy a Lower Total Cost of Ownership and Fewer Hassles'
  })
  .when('/performance', {
    controller: 'PerformanceController',
    templateUrl: '/templates/performance.html',
    title: 'Electric Vehicles Offer All the Performance You’d Expect—and More'
  })
  .when('/concierge', {
    controller: 'EVConciergeController',
    templateUrl: '/templates/EVConcierge.html',
    title: ''
  })
  .when('/gallery', {
    controller: 'EVGalleryController',
    templateUrl: '/templates/EVGallery.html',
    title: ''
  })
  .when('/resources', {
    controller: 'ResourcesController',
    templateUrl: '/templates/resources.html',
    title: 'Resources'
  })
  .when('/endorsement-disclaimer', {
    controller: 'EndorsementDisclaimerController',
    templateUrl: '/templates/endorsement-disclaimer.html',
    title: 'Endorsement Disclaimer'
  })
  .when('/template', {
    controller: 'TemplateController',
    templateUrl: '/templates/template.html',
    title: 'Template'
  })
  .otherwise('/', {redirectTo: '/'});

  $locationProvider.html5Mode({
    enabled: true,
    requireBase: false
  });
});
