app.controller('ventaCtrl', [
  '$scope', '$rootScope', '$timeout', 'SecurityService', 'Venta',
  function ($scope, $rootScope, $timeout, SecurityService, Venta) {
    console.log("ventaCtrl...");
        
    $scope.init = function(){
    	Venta.listar().then(function successCallback(response){    	
	    	$scope.ventas = response.data;
	    });
    };
  }
]);