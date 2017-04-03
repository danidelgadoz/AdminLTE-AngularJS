app.factory('Session', ['$http', 'APP_API_URL', function($http, APP_API_URL){
  return {
      login: function(user) {
        return $http({
          method: "POST",
          url: APP_API_URL + "session/login",
          async: true,
          data:{
            email: user.email,
            password: user.password
          }
        });
      },
  };
}]);

app.service('Ubigeo', ['$filter', function($filter){
    this.mtzUbigeo = {
      'matriz'      : (typeof(matrizubigeo) != "undefined") ? matrizubigeo : null,
      'departamento': [],
      'provincias'  : [],
      'distritos '  : []
    };
    
    this.departamentos = function(){
      return this.mtzUbigeo.departamentos = $filter('filter')(this.mtzUbigeo.matriz, function (Y){
        return (Y.CodDist==null && Y.CodProv==null);
      });
    };

    this.provincias = function(_departamento){
      return this.mtzUbigeo.provincias = $filter('filter')(this.mtzUbigeo.matriz, function (Y){
        return ((Y.idubigeo).startsWith(_departamento) && Y.CodDist==null && Y.CodProv!=null);
      });
    };

    this.distritos = function(_departamento, _provincia){
      return this.mtzUbigeo.distritos = $filter('filter')(this.mtzUbigeo.matriz, function (Y){
        return ((Y.idubigeo).startsWith(_departamento.concat(_provincia)) && Y.CodDist!=null);
      });
    };     
}]);

app.factory('Cliente', ['$http', 'APP_API_URL', 'DEVELOPMENT_ENVIRONMENT', function($http, APP_API_URL, DEVELOPMENT_ENVIRONMENT){
  return {
      structure: function(){
        if(DEVELOPMENT_ENVIRONMENT==true){
          var cliente = {
            "codigo"            : 'C' + (Math.floor(Math.random() * (99999 - 10000)) + 10000).toString(),
            "tipo"              : "PERSONA",
            "razon_social"      : "Daniel Eduardo Delgado Diaz",
            "documento"         : "DNI",
            "numero_documento"  : Math.floor(Math.random() * (99999999 - 10000000)) + 10000000,
            "persona_contacto"  : null,
            "rubro"             : "Tecnologia",
            "ubigeo"            : null,
            "direccion"         : "Urb. Ingenieria 975",
            "telefono1"         : 3422119,
            "telefono2"         : 987616413,
            "email"             : "dedd1993@gmail.com",
            "pagina_web"        : "www.dandel.com",
            "observacion"       : "cliente vip"
          };
        } else{
          var cliente = {
            "codigo"            : null,
            "tipo"              : "PERSONA",
            "razon_social"      : null,
            "documento"         : "DNI",
            "numero_documento"  : null,
            "persona_contacto"  : null,
            "rubro"             : null,
            "ubigeo"            : null,
            "direccion"         : null,
            "telefono1"         : null,
            "telefono2"         : null,
            "email"             : null,
            "pagina_web"        : null,
            "observacion"       : null
          };
        }

        return cliente;
      },
      list: function(pagination, tipo_cliente){
        return $http({
          method: "GET",
          url: APP_API_URL + "cliente",
          params:{
            page: pagination.page,
            limit: pagination.limit,
            where: pagination.where,
            orderby: pagination.orderby,
            desc: pagination.desc,
          }
        });
      },
      find: function(id){
        return $http({
          method: "GET",
          url: APP_API_URL + "cliente/" + id
        });
      },      
      store: function(cliente){
        return $http({
          method: "POST",
          url: APP_API_URL + "cliente",
          data: cliente
        });
      },
      update: function(cliente){
        return $http({
          method: "PUT",
          url: APP_API_URL + "cliente/" + cliente.id,
          data: cliente
        });
      },
      delete: function(id){
        return $http({
          method: "DELETE",
          url: APP_API_URL + "cliente/" + id
        });
      },      
  };
}]);

app.factory('Venta', ['$http', 'APP_API_URL', function($http, APP_API_URL){
  return {    
    listar: function(){
      console.log(APP_API_URL + "venta"  );
      return $http({
        method: "GET",
        url: APP_API_URL + "venta"        
      });
    }
  }
}]);