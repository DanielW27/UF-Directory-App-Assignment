angular.module('listings').controller('ListingsController', ['$scope', 'Listings',
  function($scope, Listings) {
    $scope.listings = Listings;
    $scope.detailedInfo = undefined;

    /*
      Implement these functions in the controller to make your application function
      as described in the assignment spec.
     */
    $scope.addListing = function() {
        $scope.listings.push({ 'code':$scope.code, 'name': $scope.name, 'address':$scope.address });
        $scope.code='';
        $scope.name='';
        $scope.address='';
    };
    $scope.deleteListing = function(name) {
      var index = -1;
      var comArr = eval( $scope.listings );
      for( var i = 0; i < comArr.length; i++ ) {
        if( comArr[i].name === name ) {
          index = i;
          break;
        }
      }
      if( index === -1 ) {
        alert( "Something gone wrong" );
      }
      $scope.listings.splice( index, 1 );
    };

    $scope.showDetails = function(listing) {
      $scope.detailedInfo = listing;
    };
  }
]);
