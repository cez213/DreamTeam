app.config(function($stateProvider){
  $stateProvider.state('cart', {
    url: '/cart',
    controller: 'CartController',
    templateUrl: 'js/cart/cart.html',
    resolve: {
        user: function(AuthService){
          return AuthService.getLoggedInUser();
        }
      }
    })
})

app.controller('CartController', function($state, $scope, user, CheckoutFactory, UserFactory, CartFactory, AlbumFactory, localStorageService){
  //set user
  $scope.user = user;

  $scope.cartItems = localStorageService.get('userCart');
  // console.log("guest cartItems", $scope.cartItems);

  //delete album from user cart
  $scope.deleteFromCart = function(currentAlbum){
    // console.log("currentAlbum", currentAlbum)
    var index = CartFactory.deleteAlbum(currentAlbum, $scope.cartItems);
    $scope.cartItems = $scope.cartItems.splice(index, 1);
    localStorageService.set('userCart', $scope.cartItems);
    $scope.user.cart = $scope.cartItems;
    UserFactory.updateUser($scope.user._id, $scope.user);
  }

  //update album from user cart
  $scope.updateCartQuantity = function(currentAlbum, quantity){
    localStorageService.set('userCart', $scope.cartItems);
    $scope.user.cart = $scope.cartItems;
    UserFactory.updateUser($scope.user._id, $scope.user);
  }

  //checkout
  $scope.checkout = function(cart){
    //CheckoutFactory.getTransaction(cart);
    $state.go('checkout');
  }



})