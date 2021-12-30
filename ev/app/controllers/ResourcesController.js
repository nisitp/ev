// ResourcesController.js
// September 8, 2016
// Alexander Rhett Crammer
// Hot Sauce
app.controller('ResourcesController', function ($scope, $rootScope) {
  $rootScope.name = 'resources';

  // It's very important not to mix these two
  // together else weird things will happen
  if ($rootScope.viewportWidth == 'phone') {
    $rootScope.addExtraScript('/revolutionary-recommender/phone/phone.hyperesources/phone_hype_generated_script.js');
    $rootScope.addExtraScript('/feedback/phone2/phone2.hyperesources/phone2_hype_generated_script.js');
  } else if ($rootScope.viewportWidth == 'tablet') {
    $rootScope.addExtraScript('/revolutionary-recommender/tablet/tablet.hyperesources/tablet_hype_generated_script.js');
    $rootScope.addExtraScript('/feedback/tablet2/tablet2.hyperesources/tablet2_hype_generated_script.js');
  }
});
