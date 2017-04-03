app.controller('loginCtrl', [
  '$scope', '$rootScope', '$location', 'Session', 'SecurityService',
  function($scope, $rootScope, $location, Session, SecurityService) {
    $scope.pageClass = 'page-login';

    if(localStorage.getItem('session_token'))//Si existe sesion redirijimos al dashboard
      $location.url("/dashboard");
    
    $scope.logindisabled=false;      
    $scope.user = {email: 'dedd1993@gmail.com', password: '123456'};  

    $scope.login = function() {
      // $location.url("/dashboard"); // Just if session is not implemented
      // return;

      $scope.logindisabled=true; 
      
      Session.login($scope.user).then(function successCallback(response) {        
        if(response.data.auth == true){
            SecurityService.init(response.data.data);

        }else{
          $scope.loginAlert = { message: response.data.data, style: {'color':'red'}};
          $scope.logindisabled=false;
        }
      });
    };

    // AdminLTE estilos
    $(function () {
      $('input').iCheck({
        checkboxClass: 'icheckbox_square-blue',
        radioClass: 'iradio_square-blue',
        increaseArea: '20%' // optional
      });
    });
  }
]);