(function(){
  angular.module('GamerPicks')
    .factory('authFactory', authFactory)

    authFactory.$inject = ['$window']

    function authFactory($window, $http){
      var service = {
        parseJWT: parseJWT,
        saveToken: saveToken,
        getToken: getToken,
        isAuthed: isAuthed,
        logout: logout
      }
      return service

      function parseJWT(token){
        var base64Url = token.split('.')[1]
        var base64 = base64Url.replace('-','+').replace('_','/')
        return JSON.parse($window.atob(base64))
      }
      function saveToken(token){
        $window.localStorage['jwtToken'] = token
      }
      function getToken(){
        return $window.localStorage['jwtToken']
      }
      function isAuthed(){
        var token = service.getToken()
        if (token) {
          var params = service.parseJWT(token)
          return Math.round(new Date().getTime() / 1000) <= params.exp
        } else {
          return false
        }
      }
      function logout(){
        $window.localStorage.removeItem('jwtToken')
        $window.localStorage.removeItem('currentUserID')
      }
    }
})()
