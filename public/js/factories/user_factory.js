(function(){
  angular.module('GamerPicks')
    .factory('userFactory', userFactory)

    userFactory.$inject = ['$http']
    function userFactory($http){
      var userUrl = '/api/users/'
      var service = {
        index: index,
        show: show,
        signup: signup,
        update: update,
        destroy: destroy,
        login: login
      }
      return service
      function index(){
        return $http.get(userUrl)
      }
      function signup(data){
        return $http.post(userUrl, data)
      }
      function show(id){
        return $http.get(userUrl + id)
      }
      function update(id, data){
        return $http.patch(userUrl + id, data)
      }
      function destroy(id){
        return $http.delete(userUrl + id)
      }
      function login(data){
        return $http.post(userUrl + 'login', data)
      }
    }
})()
