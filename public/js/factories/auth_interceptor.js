(function(){
  angular.module('GamerPicks')
    .factory('authInterceptor', authInterceptor)

    authInterceptor.$inject = ['authFactory']

    function authInterceptor(authFactory){
      var service = {
        request: request,
        response: response
      }
      return service
      function request(config){
        // console.log(101, config)
        var token = authFactory.getToken()
        if (token) {
          config.headers['x-access-token'] = token
        }
        return config
      }
      function response(response){
        //console.log(102, response)
        if (response.data.token){
          authFactory.saveToken(response.data.token)
        }
        return response
      }
    }
})()
