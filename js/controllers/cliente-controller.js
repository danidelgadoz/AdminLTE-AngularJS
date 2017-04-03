app.controller('clienteCtrl', [
  '$scope', '$rootScope', '$state','$timeout', 'SecurityService', 'Cliente', 'DashboardService',
  function ($scope, $rootScope, $state,$timeout, SecurityService, Cliente, DashboardService) {
    console.log("clienteCtrl...");
    $scope.responseAlert = {'status':false, 'class':'callout-success', 'header':null, 'content':null};
    $scope.query = {
    	limit: 5,
    	page: 1,
    	where: {
    		razon_social: null
    	},
    	orderby: 'id',
    	desc: false
    };

    $scope.init = function(_page){
    	$scope.query.page = _page ? _page : $scope.query.page;
        // DashboardService.initLoadingState();

        $scope.clientes = [];
    	Cliente.list($scope.query).then(function successCallback(response){
    		console.log(response);
            $scope.clientes = response.data.data;
            $scope.paginate(response.data.data);
            // DashboardService.endLoadingState();
	    });
    };
    $scope.init();
    
    $scope.delete = function(_cliente){
    	var cliente = _cliente.tipo=='EMPRESA' ? _cliente.razon_social : _cliente.nombres + ' ' + _cliente.apellidos;

    	$scope.modal = {
    		'type'		: 'modal-primary',
    		'tittle' 	: '¿Esta seguro de eliminar cliente?',
    		'content'	: '<p>El cliente <b>' + cliente + '</b> será eliminado.</p>',
    		'size'		: 'modal-md',
    		'cancel'	: true,
    		'confirm'	: function(){
    			Cliente.delete(_cliente.id).then(function successCallback(response){
    				window.scrollTo(0,0);
    				$scope.responseAlert = {'status':false, 'class':'callout-success', 'header':null, 'content':null};

		    		if(response.data.status == true){
		    			$scope.responseAlert = {'status':true, 'class':'callout-success', 'header':'Correcto!', 'content':'Cliente eliminado con exito.'};
		    		} else{
		    			$scope.responseAlert = {'status':true, 'class':'callout-danger', 'header':'Error!', 'content':(response.data.data.errorInfo[2]).toString()};
		    		}
		    		$scope.init();
		    		$timeout(function(){$scope.responseAlert.status=false}, 5000);
			    });
			    $("#myModalConfirm").modal('hide');
    		}
    	};

    	$("#myModalConfirm").modal();
    };

    $scope.editar = function(_cliente){
    	$state.go('dashboard.modificar_cliente', {id: _cliente.id, cliente: _cliente})
    };

    $scope.paginate = function(_pagination){
    	$scope.query.current_page = _pagination.current_page;
		$scope.query.last_page = _pagination.last_page;
		$scope.query.next_page = _pagination.next_page_url ? (_pagination.next_page_url).split("=")[1] : null;
		$scope.query.prev_page = _pagination.prev_page_url ? (_pagination.prev_page_url).split("=")[1] : null;
		$scope.query.list = [];
		for(var p=0; p<_pagination.last_page; p++){
			$scope.query.list.push(p+1);
		}
    };
  }
]);

app.controller('clienteFormCtrl', [
  '$stateParams', '$scope', '$rootScope', '$timeout', 'SecurityService', 'Cliente', 'Ubigeo',
  function ($stateParams, $scope, $rootScope, $timeout, SecurityService, Cliente, Ubigeo) {
    $scope.cliente = $stateParams.cliente ? $stateParams.cliente : Cliente.structure();
    $scope.responseAlert = {'status':false, 'class':'callout-success', 'header':null, 'content':null};

    $scope.ubigeo = {
    	codigo: {
    		departamento: null,
    		provincia: null,
    		distrito: null,
    	},
    	departamentos : function(){
    		return Ubigeo.departamentos();
    	},
    	provincias : function(){
    		return this.codigo.departamento ? Ubigeo.provincias(this.codigo.departamento) :null;
    	},
    	distritos : function(){
    		return this.codigo.provincia ? Ubigeo.distritos(this.codigo.departamento, this.codigo.provincia) : null;
    	},
    	store : function(){
    		$scope.cliente.ubigeo =  this.codigo.departamento.concat(this.codigo.provincia, this.codigo.distrito);
    	}
    };

    $scope.store = function(){
    	window.scrollTo(0,0);
    	$scope.responseAlert = {'status':false, 'class':'callout-success', 'header':null, 'content':null};
    	console.log($scope.cliente);

    	Cliente.store($scope.cliente).then(function successCallback(response){
    		console.log(response);
    		
    		if(response.data.status == true){
    			$scope.responseAlert = {'status':true, 'class':'callout-success', 'header':'Correcto!', 'content':'Cliente registrado con exito. <a href="#/clientes" class="alert-link">Ir al listado de clientes</a>.'};
    		} else{
    			$scope.responseAlert = {'status':true, 'class':'callout-danger', 'header':'Error!', 'content':(response.data.data.errorInfo[2]).toString()};
    		}
    		// $timeout(function(){$scope.responseAlert.status=false}, 5000);
    	});
    };

    $scope.update = function(){
    	window.scrollTo(0,0);
    	$scope.responseAlert = {'status':false, 'class':'callout-success', 'header':null, 'content':null};
    	console.log($scope.cliente);

    	Cliente.update($scope.cliente).then(function successCallback(response){
    		console.log(response);
    		
    		if(response.data.status == true){
    			$scope.responseAlert = {'status':true, 'class':'callout-success', 'header':'Correcto!', 'content':'Cliente actualizado con exito. <a href="#/clientes" class="alert-link">Ir al listado de clientes</a>.'};
    		} else{
    			$scope.responseAlert = {'status':true, 'class':'callout-danger', 'header':'Error!', 'content':(response.data.data.errorInfo[2]).toString()};
    		}
    		// $timeout(function(){$scope.responseAlert.status=false}, 5000);
    	});
    };

    $scope.changeTipo = function(_tipo){
    	switch(_tipo){
    		case 'EMPRESA':
    			$scope.cliente.nombres = null;
    			$scope.cliente.apellidos = null;
    			$scope.cliente.documento = 'RUC';
    			break;
    		case 'PERSONA':
    			$scope.cliente.razon_social = null;
    			$scope.cliente.persona_contacto = null;
    			$scope.cliente.documento = 'DNI';
    			break;
    	}
    };

    $scope.reset = function(){
    	$scope.cliente = $stateParams.cliente ? $stateParams.cliente : Cliente.loadDataDemo();
    	$scope.responseAlert.status=false;
    	// $scope.responseAlert = {'status':false, 'class':'callout-success', 'header':null, 'content':null};
    };

    // Brings data just in case if someonele has already modified this client in another session
    if($stateParams.id){
    	Cliente.find($stateParams.id).then(function successCallback(response){
	    	$scope.cliente = response.data.data;
	    	$scope.ubigeo.codigo = {
	    		departamento: $scope.cliente.ubigeo ? ($scope.cliente.ubigeo).slice(0,2) : null,
	    		provincia: $scope.cliente.ubigeo ? ($scope.cliente.ubigeo).slice(2,4) : null,
	    		distrito: $scope.cliente.ubigeo ? ($scope.cliente.ubigeo).slice(4,6) : null,
	    	};
	    });
    };
  }
]);