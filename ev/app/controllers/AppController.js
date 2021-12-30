// AppController.js
// August 29, 2016
// Alexander Rhett Crammer
// Hot Sauce
app.controller('AppController', function ($scope, $rootScope, $document, $http, $location, $anchorScroll) {
  $rootScope.name = 'app';
  $rootScope.currentNavigationChoice;
  $rootScope.revealingFeedbackForm = false;
  $rootScope.revealingFooterFeedbackForm = false;
  $rootScope.revealingMobileMenu = false;
  $rootScope.emailPattern = /^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^()\.,;\s@\"]+\.{0,1})+[^()\.,;:\s@\"]{2,})$/;
  $rootScope.extraScripts = [];

  $rootScope.addExtraScript = function (path) {
    if ($rootScope.extraScripts.indexOf(path) == -1) {
      $rootScope.extraScripts = $rootScope.extraScripts.concat([path]);
    }
  };

  $rootScope.addExtraScript('/bower_components/slick-carousel/slick/slick.js');
  $rootScope.addExtraScript('/bower_components/matchHeight/dist/jquery.matchHeight-min.js');

  $rootScope.links = [{
    'identifier': 'join-the-revolution',
    'title': 'Join the Revolution',
    'subnavigationLinks': [{
      'identifier': 'revolutionary-recommender',
      'title': 'Revolutionary Recommender',
      'path': '/',
      'destinationID': '#revolutionary-recommender-anchor',
      'jumps': true
    }, {
      'identifier': 'concierge',
      'title': 'EVConcierge',
      'path': '/concierge'
    }, {
      'identifier': 'gallery',
      'title': 'Car Comparisons',
      'path': '/gallery'
    }, {
      'identifier': 'what-is-next',
      'title': 'What\'s Next?',
      'path': '/',
      'destinationID': '#call-to-action-container',
      'jumps': true
    }]
  }, {
    'identifier': 'why-go-electric',
    'title': 'Why go Electric?',
    'subnavigationLinks': [{
      'identifier': 'performance',
      'title': 'Unbeatable Performance',
      'path': '/performance'
    }, {
      'identifier': 'savings',
      'title': 'Incredible Savings',
      'path': '/affordable'
    }]
  }, {
    'identifier': 'resources',
    'title': 'Additional Resources',
    'subnavigationLinks': [{
      'identifier': 'resources',
      'title': 'General Information',
      'path': '/resources'
    }, {
      'identifier': 'charging-stations',
      'title': 'Charging Stations',
      'path': '/resources',
      'destinationID': '#nearby-charging-stations',
      'jumps': true
    }]
  }];

  $document.ready(function () {
    $http.get('tweets.aspx').then(function () {
      $('#tweet-feed').load("/cache/twitter.txt");
    });

    if ($('#tweet-feed').length > 0) initTweets();
  });

  $rootScope.updateCurrentNavigationChoice = function (to) {
    if ($(window).width() > 1200) {
      // Hide the feedback form
      $rootScope.revealingFeedbackForm = false;
    }

    // Toggle if the user is trying to reveal
    // the list and it's already revealed
    // otherwise reveal a different list
    if ($rootScope.currentNavigationChoice == to) {
      $rootScope.currentNavigationChoice = '';
    } else {
      $rootScope.currentNavigationChoice = to;
    }
  };

  $rootScope.pushSubnavigationList = function (forItemWithIdentifier) {
    if ($(window).width() < 1200) {
      $('.mobile-subnavigation-links.' + forItemWithIdentifier + '-subnavigation-list').addClass('revealed');

      // Hide the list at the first level
      $('.navigation-links').addClass('underneath');
    }
  };

  $rootScope.dismissSubnavigationLists = function () {
    $('.mobile-subnavigation-links').removeClass('revealed');

    // Show the list at the first level
    $('.navigation-links').removeClass('underneath');
  };

  $rootScope.toggleMobileMenu = function () {
    $rootScope.revealingMobileMenu = !$rootScope.revealingMobileMenu;
    $('.navigation-links').slideToggle(125, function () {
      $('.navigation-links').toggleClass('opened');
    });
  };

  $rootScope.hideMobileMenu = function (transitionTime) {
    $rootScope.revealingMobileMenu = false;

    if (transitionTime == undefined) {
      transitionTime = 125;
    }

    // Hide the mobile navigation list if it's visible
    $('.navigation-links').slideToggle(transitionTime, function () {
      $('.navigation-links').removeClass('opened');
    });
  };

  $rootScope.toggleFeedbackForm = function () {
    $rootScope.revealingFeedbackForm = !$rootScope.revealingFeedbackForm;

    // Hide visible subnavigation links if they're showing
    $rootScope.currentNavigationChoice = '';

    // Hide the mobile menu if it's visible
    if ($rootScope.revealingMobileMenu) {
      $rootScope.hideMobileMenu(0);
    }
  };

  $rootScope.toggleFooterFeedbackForm = function () {
    $rootScope.revealingFooterFeedbackForm = !$rootScope.revealingFooterFeedbackForm;
  };

  $rootScope.hideFooterFeedbackForm = function () {
    $rootScope.revealingFooterFeedbackForm = false;
  };

  $rootScope.scrollTo = function (destinationID) {
    $location.hash(destinationID);
    $anchorScroll();
  };

  $rootScope.animateTo = function (destinationID, path) {
    $location.url(path);
    setTimeout(function () {
      $('html, body').animate({
        scrollTop: $(destinationID).offset().top
      }, 250)
    }, 250);
  };

  function initTweets () {
    var checkTweets = setInterval(function(){
    if( $('#tweet-feed .tweets').length>0 ) {
      var tweetSlider = $('#tweet-feed .tweets').slick({
        infinite: true,
        mobileFirst: true,
        arrows: false,
        dots: false,
        responsive: [{
          breakpoint: 1024,
          settings: {
            slidesToShow: 3,
            slidesToScroll: 1,
          }
        }, {
          breakpoint: 768,
          settings: {
            slidesToShow: 3,
            slidesToScroll: 1
          }
        }]
      });
        $('#tweet-feed .tweet').matchHeight({
          byRow: true
        });
        clearInterval(checkTweets);
      }
    }, 200);

    $('#tweet-feed').next('.direction-nav').find('.nav-prev').click(function(){
      $(this).parents('.direction-nav').prev('#tweet-feed').find('.slick-slider').slick('slickPrev');
    });
    $('#tweet-feed').next('.direction-nav').find('.nav-next').click(function(){
      $(this).parents('.direction-nav').prev('#tweet-feed').find('.slick-slider').slick('slickNext');
    });
  }
});
