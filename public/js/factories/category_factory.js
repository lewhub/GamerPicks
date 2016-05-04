(function(){
  angular.module('GamerPicks')
    .factory('CategoryFactory', CategoryFactory)

    CategoryFactory.$inject = ['$http']

    function CategoryFactory($http){
      var apiUrl = "/api/categories/"
      var service = {
        index: index,
        show: show
      }
      return service
      function index(){
        return $http.get(apiUrl)
      }
      function show(id){
        return $http.get(apiUrl + id)
      }
    }
})()
