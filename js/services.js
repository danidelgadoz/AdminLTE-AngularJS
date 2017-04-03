app.service('SecurityService', ['$rootScope', '$location', function($rootScope, $location) {
  this.init = function(response) {
    localStorage.setItem("session_username", response.name);
    localStorage.setItem("session_token", response.remember_token);
    localStorage.setItem("session_type", 'ADMIN');

    $rootScope.user.name = response.name;
    $rootScope.user.type = 'ADMIN';

    $location.url("/dashboard");
  };

  this.end = function() {
    localStorage.clear();

    $location.url("/login");
    // location.reload();
    return;
  };

  this.getToken = function() {
      return localStorage.getItem('session_token');
  };

  this.secureRequest = function(requestConfig) { //look in config Service
    var token = this.getToken();

    if(token != null && token != '' && token != 'undefined') {      
      requestConfig.headers['Authorization'] = 'Bearer ' + token;
    } else{
      //$location.url("/login");
    }
  };
}]);

app.service('AdminLTEService', ['$timeout', function($timeout){
    /**
     * This functions sets and removes asynchronously a js file at calling it..
     * I use it for a js file of the AdminLTE that must be declared after the view
     */
    this.loadFileAsync = function(url, type, charset) {
        console.log("Loading file: " + url);

        if (type===undefined) type = 'text/javascript';
        if (url) {
            var script = document.querySelector("script[src*='"+url+"']");           
            if (!script) {
                var heads = document.getElementsByTagName("head");
                if (heads && heads.length) {
                    var head = heads[0];
                    if (head) {
                        script = document.createElement('script');
                        script.setAttribute('src', url);
                        script.setAttribute('type', type);
                        if (charset) script.setAttribute('charset', charset);
                        head.appendChild(script);
                    }
                }
            }
            return script;
        }
    };

    this.removeFileAsync = function(url){
      document.querySelector("script[src*='"+url+"']").remove();
    };

    /**
     * AdminLTE: 'The next block of code implements AdminLTE's functions and plugins as 
     * specified  by the options above'.
     * 
     * This function is called when we get in our dashboard for second time
     * and we ned to refresh all components, feel free to refress other components,
     * look for them in 'AdminLTE/dist/js/app.js' file at 'Implementation' section
     */
    this.implementation = function(){
      $timeout(function(){
        var o = $.AdminLTE.options;
        $.AdminLTE.layout.activate();
        $.AdminLTE.pushMenu.activate(o.sidebarToggleSelector);
        $.AdminLTE.controlSidebar.activate();
      }, 100);
    };
}]);

app.service('DashboardService', ['$timeout', function($timeout){

    /**
     * This function sets the main content in a loading state..
     */
    this.initLoadingState = function(){
      $timeout(function(){
        $('.mask').addClass('ajax');
        $(".mask").height($("#app-content").height());
        $("#app-content").css({
          'display' : 'inline-block',
          'position': 'relative',
          'opacity' : '.5'
        });
      }, 1);
    };

    /**
     * This function removes the loading state..
     */
    this.endLoadingState = function(){
      $('.mask').removeClass('ajax');
      $("#app-content").css({
          'display' : '',
          'position': '',
          'opacity' : ''
        });
    };
}]);