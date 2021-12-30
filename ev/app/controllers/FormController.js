app.controller('FormController', function ($scope, $http) {

/*
    $scope.submitted = true;
    if(signUpForm.email.$valid){
	    alert("valid");
    }
    else{
	    alert("invalid");
    }
*/
   // get the form data
	$scope.formData = {
	    'email'	: $scope.email,
	    // 'HiddenEmail'	:	'G2INNOVATE@southernco.com',
	    'HiddenRedirect'	: 'http://innovation.southernco.com/EIC/thank-you.html',
	    'HiddenSubject'	: 'Your Revolution feedback'
	};

   $scope.submitForm = function(data) {



    if(!$scope.signUpForm.$valid){
	    $scope.error = 1;
    }
    else{
			// Posting data to php file
      $http({
        method  : 'POST',
        url     : 'https://xeform.southernco.com/smartmail.ashx',
        data    : 'HiddenEmail=revolution%40southernco.com&HiddenRedirect=http%3A%2F%www.joinevrevolution.com&HiddenSubject=Revolution+Interest&Message=I+want+to+stay+updated+on+Revolution+'+$scope.email+'&Email='+$scope.email, //forms user object
        headers : {'Content-Type': 'application/x-www-form-urlencoded'}
       })
       .success(function(data) {
          $scope.successMessage = "Thank you for your interest! We look forward to keeping in touch as we make this rEVolution together.";
       })
       .error(function(data) {
          $scope.successMessage = "Thank you for your interest! We look forward to keeping in touch as we make this rEVolution together.";
       });
      };
    }
});
