// EVGalleryController.js
// October 20, 2016
// Alexander Rhett Crammer
// Hot Sauce

app.controller('EVGalleryController', function ($scope, $rootScope) {
  $rootScope.name = 'EVGallery';
  $rootScope.extraStylesheets = $rootScope.extraStylesheets.concat([
    '/bower_components/angular-ui-switch/angular-ui-switch.min.css'
  ]);

  $scope.selectedView = 'list';
  $scope.orderOptions = ['Ascending', 'Descending'];
  $scope.orderByOption = 'Ascending';
  $scope.sortingOptions = [{
    "identifier": "makeAndModel",
    "name": "Make and Model"
  }, {
    "identifier": "evStatus",
    "name": "Type"
  }, {
    "identifier": "range",
    "name": "Range"
  }, {
    "identifier": "seatingCapacity",
    "name": "Capacity"
  }, {
    "identifier": "accelerationTime",
    "name": "0-60mph"
  }, {
    "identifier": "price",
    "name": "Price"
  }];
  $scope.sortByOption = $scope.sortingOptions[0];

  $scope.swapToListView = function () {
    $('.view-icon').removeClass('selected');

    // Highlight the appropriate icon
    $('.list-view-icon').addClass('selected');

    // Show the appropriate view
    $scope.selectedView = 'list';

    // Switch the switch
    $scope.viewSwitch = false;

    // Remove the matched height
    $('.grid-view').css('height', 'auto');
  };

  $scope.swapToGridView = function () {
    $('.view-icon').removeClass('selected');

    // Highlight the appropriate icon
    $('.grid-view-icon').addClass('selected');

    // Show the appropriate view
    $scope.selectedView = 'grid';

    // Switch the switch
    $scope.viewSwitch = true;

    // Match the height of the listings
    $scope.matchGridListingHeights();
  };

  $scope.swapView = function () {
    if ($('.list-view-icon').is('.selected')) {
      $scope.swapToGridView();
    } else {
      $scope.swapToListView();
    }
  };

  $scope.matchGridListingHeights = function () {
    setTimeout(function () {
      $('.grid-view').matchHeight({byRow: true});
    }, 25);
  };

  $scope.sortElectricVehicles = function (byPropertyWithName, e) {
    // Either grab the property name as a parameter
    // or get it from the 'select' node
    var propertyNameToSortBy = byPropertyWithName || $scope.sortByOption.identifier;

    // Assume this method was triggered by a header cell
    // if 'byPropertyWithName' has a value; Tell the rest
    // of the app about the sorting option change if it
    // was changed by clicking a header cell
    if (byPropertyWithName) {
      for (var i = 0; i < $scope.sortingOptions.length; i++) {
        var sortingOption = $scope.sortingOptions[i];
        if (sortingOption.identifier == byPropertyWithName) {
          $scope.sortByOption = sortingOption;
        }
      }
    }

    // Sort the vehicles unless they're already
    // being sorted via the table header cells
    if (byPropertyWithName && $(e.currentTarget).is('.sorting-by') == false || byPropertyWithName == undefined) {
      // Sort the list of Electric Vehicles
      $scope.electricVehicles.sort(function (a, b) {
        if (a[propertyNameToSortBy] < b[propertyNameToSortBy]) return -1;
        if (a[propertyNameToSortBy] > b[propertyNameToSortBy]) return 1;
        return 0;
      });
    }

    // Remove styles for the column being sorted by
    $('.vehicle-gallery thead td').removeClass('sorting-by');

    // Add the styles to the new column being sorted by
    $('.' + $scope.sortByOption.identifier + 'Column').addClass('sorting-by');

    if ($scope.orderByOption == 'Ascending') {
      $scope.orderByOption = 'Descending';
      $scope.reorderElectricVehicles();
    } else if ($scope.orderByOption == 'Descending') {
      $scope.orderByOption = 'Ascending';
      $scope.reorderElectricVehicles();
    }

    $scope.matchGridListingHeights();
  };

  $scope.reorderElectricVehicles = function () {
    // Since there are only two options ('Ascending'
    // and 'Descending') we can just flip the array
    $scope.electricVehicles.reverse();

    $scope.matchGridListingHeights();
  };

  $scope.toggleDetails = function (e) {
    var button = $(e.currentTarget);

    // Expand the details about the car
    button.prev('.car-specs').slideToggle(125);

    // Flip the chevron
    button.toggleClass('opened');

    // Show the border on the car brief
    button.siblings('.car-brief').toggleClass('opened');

    // Swap the button title
    if (button.text() == 'Close Details') {
      button.text('View Details');
    } else {
      button.text('Close Details');
    }
  };

  $scope.electricVehicles = [{
    id: 1,
    spriteIconPosition: '-5px 0',
    makeAndModel: "Audi A3 e-tron",
    evStatus: "PHEV",
    price: 37900,
    priceWithFederalTaxCredit: '$33,200',
    bodyType: "Sedan",
    range: 16,
    accelerationTime: 7.6,
    hasFastCharging: '-',
    seatingCapacity: '5',
    coolFactor: 4,
    carMaxReview: '',
    similarElectricVehicles: ['Chevy Volt', 'BMW 330e'],
    dealershipLink: 'https://www.audiusa.com/technology/efficiency/e-tron'
  }, {
    id: 2,
    spriteIconPosition: '-150px 0',
    makeAndModel: "BMW 330e",
    evStatus: "PHEV",
    price: 42400,
    priceWithFederalTaxCredit: '$40,694',
    bodyType: "Sedan",
    range: 14,
    accelerationTime: 6.1,
    hasFastCharging: '-',
    seatingCapacity: '5',
    coolFactor: 4,
    carMaxReview: '',
    similarElectricVehicles: ['Toyota Prius Plug-In', 'Audi A3 e-tron'],
    dealershipLink: 'http://www.bmwusa.com/bmw/bmwi'
  }, {
    id: 3,
    spriteIconPosition: '-10px -105px',
    makeAndModel: "BMW i3",
    evStatus: "100% Electric",
    price: 42400,
    priceWithFederalTaxCredit: '$34,900',
    bodyType: "Subcompact sedan",
    range: 81,
    accelerationTime: 6.4,
    hasFastCharging: 'Yes',
    seatingCapacity: '4',
    coolFactor: 3,
    carMaxReview: {
      customersLike: [
        'Cabin Noise',
        'Cost to Maintain',
        'Fuel Economy'
      ],
      customersDislike: [
        'Braking',
        'Dashboard'
      ]
    },
    similarElectricVehicles: ['Chevy Bolt*', 'Nissan LEAF'],
    dealershipLink: 'http://www.bmwusa.com/bmw/bmwi'
  }, {
    id: 4,
    spriteIconPosition: '-155px -105px',
    makeAndModel: "BMW i8",
    evStatus: "PHEV",
    price: 135700,
    priceWithFederalTaxCredit: '$131,907',
    bodyType: "Sports",
    range: 15,
    accelerationTime: 4.4,
    hasFastCharging: '-',
    seatingCapacity: '2',
    coolFactor: 5,
    carMaxReview: '',
    similarElectricVehicles: ['Porsche Panamera S E-Hybrid', 'Tesla Model S'],
    dealershipLink: 'http://www.bmwusa.com/bmw/bmwi'
  }, {
    id: 5,
    spriteIconPosition: '-295px 0',
    makeAndModel: "BMW X5 xDrive40e",
    evStatus: "PHEV",
    price: 63095,
    priceWithFederalTaxCredit: '$59,095',
    bodyType: "SUV",
    range: 14,
    accelerationTime: 6.5,
    hasFastCharging: '-',
    seatingCapacity: '5',
    coolFactor: 4,
    carMaxReview: '',
    similarElectricVehicles: ['Porsche Cayenne S E-Hybrid', 'Volvo XC90 T8'],
    dealershipLink: 'http://www.bmwusa.com/bmw/bmwi'
  }, {
    id: 6,
    spriteIconPosition: '-295px -105px',
    makeAndModel: "Chevy Bolt*",
    evStatus: "100% Electric",
    price: 37500,
    priceWithFederalTaxCredit: '$30,000',
    bodyType: "Subcompact sedan",
    range: 200,
    accelerationTime: 7,
    hasFastCharging: 'Yes',
    seatingCapacity: '5',
    coolFactor: 3,
    carMaxReview: '',
    similarElectricVehicles: ['Tesla Model 3*', 'BMW 330e'],
    dealershipLink: 'http://www.chevrolet.com/electric-hybrid-vehicles.html'
  }, {
    id: 7,
    spriteIconPosition: '-5px -210px',
    makeAndModel: "Chevy Volt",
    evStatus: "PHEV",
    price: 33170,
    priceWithFederalTaxCredit: '$25,670',
    bodyType: "Sedan",
    range: 53,
    accelerationTime: 7.8,
    hasFastCharging: '-',
    seatingCapacity: '5',
    coolFactor: 4,
    carMaxReview: '',
    similarElectricVehicles: ['Audi A3 e-tron', 'Toyota Prius Plug-In'],
    dealershipLink: 'http://www.chevrolet.com/electric-hybrid-vehicles.html'
  }, {
    id: 8,
    spriteIconPosition: '-155px -210px',
    makeAndModel: "Ford C-Max Energi",
    evStatus: "PHEV",
    price: 31770,
    priceWithFederalTaxCredit: '$27,763',
    bodyType: "Subcompact sedan",
    range: 20,
    accelerationTime: 8.5,
    hasFastCharging: '-',
    seatingCapacity: '5',
    coolFactor: 2,
    carMaxReview: {
      customersLike: [
        'Fuel Economy',
        'Braking',
        'Cabin Noise'
      ],
      customersDislike: [
        'Braking',
        'Cargo Space',
        'Dashboard'
      ]
    },
    similarElectricVehicles: ['Ford Fusion Energi', 'Toyota Prius Plug-In'],
    dealershipLink: 'http://www.ford.com/new-hybrids-evs/'
  }, {
    id: 9,
    spriteIconPosition: '-297px -210px',
    makeAndModel: "Ford Fusion Energi",
    evStatus: "PHEV",
    price: 33900,
    priceWithFederalTaxCredit: '$29,893',
    bodyType: "Sedan",
    range: 20,
    accelerationTime: 7.9,
    hasFastCharging: '-',
    seatingCapacity: '5',
    coolFactor: 3,
    carMaxReview: {
      customersLike: [
        'Cabin Noise',
        'Fuel Economy',
        'Styling'
      ],
      customersDislike: [
        'Cargo Space',
        'Technology and Entertainment',
        'Value'
      ]
    },
    similarElectricVehicles: ['Toyota Prius Plug-In', 'Ford C-Max Energi'],
    dealershipLink: 'http://www.ford.com/new-hybrids-evs/'
  }, {
    id: 10,
    spriteIconPosition: '-440px -425px',
    makeAndModel: "Ford Focus Electric",
    evStatus: "100% Electric",
    price: 29170,
    priceWithFederalTaxCredit: '$21,670',
    bodyType: "Sedan",
    range: 76,
    accelerationTime: 10.1,
    hasFastCharging: '-',
    seatingCapacity: '5',
    coolFactor: 3,
    carMaxReview: '',
    similarElectricVehicles: ['Nissan LEAF', 'BMW i3'],
    dealershipLink: 'http://www.ford.com/new-hybrids-evs/'
  }, {
    id: 11,
    spriteIconPosition: '-10px -320px',
    makeAndModel: "Mitsubishi i-MiEV",
    evStatus: "100% Electric",
    price: 22995,
    priceWithFederalTaxCredit: '$15,495',
    bodyType: "Subcompact sedan",
    range: 62,
    accelerationTime: 13,
    hasFastCharging: 'Yes',
    seatingCapacity: '4',
    coolFactor: 1,
    carMaxReview: '',
    similarElectricVehicles: ['Smart Electric Drive', 'Ford Focus Electric'],
    dealershipLink: 'http://www.mitsubishicars.com/imiev'
  }, {
    id: 12,
    spriteIconPosition: '-155px -320px',
    makeAndModel: "Nissan LEAF",
    evStatus: "100% Electric",
    price: 34200,
    priceWithFederalTaxCredit: '$26,700',
    bodyType: "Subcompact sedan",
    range: 107,
    accelerationTime: 10.2,
    hasFastCharging: 'Yes',
    seatingCapacity: '5',
    coolFactor: 2,
    carMaxReview: {
      customersLike: [
        'Fuel Economy',
        'Power',
        'Cabin Noise'
      ],
      customersDislike: [
        'Cargo Space',
        'Styling',
        'Reliability'
      ]
    },
    similarElectricVehicles: ['Ford Focus Electric', 'Chevy Bolt*'],
    dealershipLink: 'http://www.nissanusa.com/electric-cars/leaf/'
  }, {
    id: 13,
    spriteIconPosition: '-10px -425px',
    makeAndModel: "Porsche Cayenne S E-Hybrid",
    evStatus: "PHEV",
    price: 77200,
    priceWithFederalTaxCredit: '$71,864',
    bodyType: "SUV",
    range: 14,
    accelerationTime: 5.4,
    hasFastCharging: '-',
    seatingCapacity: '5',
    coolFactor: 5,
    carMaxReview: '',
    similarElectricVehicles: ['Tesla Model X', 'BMW X5 xDrive40e'],
    dealershipLink: 'http://www.porsche.com/microsite/mission-e/international.aspx'
  }, {
    id: 14,
    spriteIconPosition: '-295px -320px',
    makeAndModel: "Porsche Panamera S E-Hybrid",
    evStatus: "PHEV",
    price: 96100,
    priceWithFederalTaxCredit: '$91,348',
    bodyType: "Luxury sedan",
    range: 15,
    accelerationTime: 5.2,
    hasFastCharging: '-',
    seatingCapacity: '4',
    coolFactor: 4,
    carMaxReview: '',
    similarElectricVehicles: ['BMW i8', 'Tesla Model S'],
    dealershipLink: 'http://www.porsche.com/microsite/mission-e/international.aspx'
  }, {
    id: 15,
    spriteIconPosition: '-150px -425px',
    makeAndModel: "Smart Electric Drive",
    evStatus: "100% Electric",
    price: 25000,
    priceWithFederalTaxCredit: '$17,500',
    bodyType: "Minicar",
    range: 68,
    accelerationTime: 9.8,
    hasFastCharging: '-',
    seatingCapacity: '2',
    coolFactor: 1,
    carMaxReview: '',
    similarElectricVehicles: ['Mitsubishi i-MiEV', 'Ford Focus Electric'],
    dealershipLink: 'http://www.smartusa.com/models/electric-coupe'
  }, {
    id: 16,
    spriteIconPosition: '-295px -425px',
    makeAndModel: "Tesla Model 3*",
    evStatus: "100% Electric",
    price: 35000,
    priceWithFederalTaxCredit: '$27,500',
    bodyType: "Sedan",
    range: 215,
    accelerationTime: 5,
    hasFastCharging: 'Yes',
    seatingCapacity: '5',
    coolFactor: 4,
    carMaxReview: '',
    similarElectricVehicles: ['Chevy Bolt*', 'BMW 330e'],
    dealershipLink: 'https://www.tesla.com/'
  }, {
    id: 17,
    spriteIconPosition: '-435px 0px',
    makeAndModel: "Tesla Model S",
    evStatus: "100% Electric",
    price: 83000,
    priceWithFederalTaxCredit: '$75,500',
    bodyType: "Luxury sedan",
    range: 270,
    accelerationTime: 4.2,
    hasFastCharging: 'Yes',
    seatingCapacity: '5',
    coolFactor: 5,
    carMaxReview: '',
    similarElectricVehicles: ['BMW i8', 'Porsche Panamera S E-Hybrid'],
    dealershipLink: 'https://www.tesla.com/'
  }, {
    id: 18,
    spriteIconPosition: '-435px -105px',
    makeAndModel: "Tesla Model X",
    evStatus: "100% Electric",
    price: 95500,
    priceWithFederalTaxCredit: '$88,000',
    bodyType: "SUV",
    range: 257,
    accelerationTime: 4.8,
    hasFastCharging: 'Yes',
    seatingCapacity: '5 to 7',
    coolFactor: 5,
    carMaxReview: '',
    similarElectricVehicles: ['Porsche Cayenne S E-Hybrid', 'BMW X5 xDrive40e'],
    dealershipLink: 'https://www.tesla.com/'
  }, {
    id: 19,
    spriteIconPosition: '-440px -210px',
    makeAndModel: "Toyota Prius Plug-In",
    evStatus: "PHEV",
    price: 29990,
    priceWithFederalTaxCredit: '$27,490',
    bodyType: "Sedan",
    range: 6,
    accelerationTime: 10.2,
    hasFastCharging: '-',
    seatingCapacity: '5',
    coolFactor: 2,
    carMaxReview: {
      customersLike: [
        'Fuel Economy',
        'Braking',
        'Cost to Maintain'
      ],
      customersDislike: [
        'Power',
        'Cargo Space',
        'Interior Space'
      ]
    },
    similarElectricVehicles: ['BMW 330e', 'Ford Fusion Energi'],
    dealershipLink: 'http://www.toyota.com/upcoming-vehicles/prius-prime/'
  }, {
    id: 20,
    spriteIconPosition: '-440px -315px',
    makeAndModel: "Volvo XC90 T8",
    evStatus: "PHEV",
    price: 69100,
    priceWithFederalTaxCredit: '$64,500',
    bodyType: "SUV",
    range: 17,
    accelerationTime: 5.6,
    hasFastCharging: '-',
    seatingCapacity: '7',
    coolFactor: 4,
    carMaxReview: '',
    similarElectricVehicles: ['BMW X5 xDrive40e', 'Porsche Cayenne S E-Hybrid'],
    dealershipLink: 'http://www.volvocars.com/us/about/our-innovations/drive-e'
  }];
});
