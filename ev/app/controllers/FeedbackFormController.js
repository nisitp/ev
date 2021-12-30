// FeedbackFormController.js
// December 5, 2016
// Alexander Rhett Crammer
// Hot Sauce

app.controller('FeedbackFormController', function ($scope, $http) {
  $scope.successfullySubmitted = false;
  $scope.wantsSubscription = false;

  $scope.submitForm = function () {
    // Submit the users' feedback
    if (($scope.feedbackForm && $scope.feedbackForm.$valid) || $scope.footerFeedbackForm.$valid) {
      $http({
        method: 'POST',
        url: 'https://xeform.southernco.com/smartmail.ashx',
        headers : {'Content-Type': 'application/x-www-form-urlencoded'},
        data: $.param({
          HiddenEmail: 'revolution@southernco.com',
          HiddenRedirect: 'http://joinevrevolution.com/',
          HiddenSubject: 'Revolution Feedback',
          Message: $scope.message,
          Name: $scope.firstName,
          EmailAddress: $scope.email,
          Maillist: $scope.wantsSubscription
        })
      });

      // Show the user the 'Thank You' message
      $scope.successfullySubmitted = true;
    }

    // If the user wants to subscribe to the
    // newsletter trigger another email for it
    if ($scope.wantsSubscription) {
      $http({
        method: 'POST',
        url: 'https://xeform.southernco.com/smartmail.ashx',
        headers: {'Content-Type': 'application/x-www-form-urlencoded'},
        data: $.param({
          HiddenEmail: 'revolution@southernco.com',
          HiddenRedirect: 'http://joinevrevolution.com/',
          HiddenSubject: 'Revolution Mailing List',
          Message: 'I want to stay updated on the Revolution! My email address is: ' + $scope.email + '.',
          Email: $scope.email
        })
      });
    }
  }

  $scope.scrollToSuccessMessage = function (withSelector) {
    $('html, body').animate({
      scrollTop: $(withSelector).offset().top
    }, 150);
  };
});
