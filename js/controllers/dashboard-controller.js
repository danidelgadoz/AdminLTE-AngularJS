app.controller('dashboardCtrl', [
'$scope', '$rootScope', '$timeout', 'SecurityService', 'AdminLTEService',
  function ($scope, $rootScope, $timeout, SecurityService, AdminLTEService) {
    console.log("dashboardCtrl...");

    $scope.logout = function(){
      SecurityService.end();      
    };
    
    if(!$.AdminLTE){
    	console.log("AdminLTE.js not defined");
    	AdminLTEService.loadFileAsync('../AdminLTE/dist/js/app.js', 'text/javascript', 'utf-8');
    }
    else{
    	console.log("AdminLTE.js already defined");
    	AdminLTEService.implementation();
    }

    $rootScope.$on('$locationChangeSuccess', function(event){    	
    	// This sets footer at bottom after entering a new view
    	$.AdminLTE.layout.activate();
	});
  }
]);