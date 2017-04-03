app.constant('APP_API_URL', 'http://localhost:8000/api/');
app.constant('DEVELOPMENT_ENVIRONMENT', false);
app.constant('GMAP_KEY', 'AIzaSyDSdD9RHz1vrCg7zHc03_JeYkblx1KiJiE');

app.config(['$locationProvider', function($locationProvider) {
  $locationProvider.hashPrefix('');
  $locationProvider.html5Mode(false);
}]);

app.config(['$qProvider', function ($qProvider) {
  $qProvider.errorOnUnhandledRejections(false);
}]);

app.config(['$httpProvider', function($httpProvider){
  $httpProvider.interceptors.push(['$q', 'SecurityService', '$location', function($q, SecurityService, $location) {
    return {
      'request': function(config) {
        SecurityService.secureRequest(config);
        return config;
      },

      'requestError': function(rejection) {
        // do something on error
        /*if (canRecover(rejection)) {
          return responseOrNewPromise
        }*/
        return $q.reject(rejection);
      },

      'response': function(response) {
        if(response.data.auth == false){ //Gn7 Apis will return false just when token send invalid...
          console.log("No se encontro autorizacion...");
          SecurityService.end();
          $location.url("/login");
        }
        return response;
      },

     'responseError': function(rejection) {
        // do something on error
        /*if (canRecover(rejection)) {
          return responseOrNewPromise
        }*/
        return $q.reject(rejection);
      }
    };
  }]);
}]);
