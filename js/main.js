// Creación del módulo
var app = angular.module('MyAngularAppName', [
        'ngSanitize',
        'ui.router',
        'ngAnimate'
  ]);

app.run([
  '$rootScope', '$location',
  function($rootScope, $location){
    $rootScope.user = {
      name : localStorage.getItem('session_username') ? localStorage.getItem('session_username'): 'Daniel Delgado',
      type : localStorage.getItem('session_type'),
      token: localStorage.getItem('session_token'),
    };

    $rootScope.getLocation = function(){      
      return $location.url();
    }
    
  }
]);