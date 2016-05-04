(function(){
  angular.module('GamerPicks')
    .factory('GameFactory', GameFactory)

    GameFactory.$inject = ['$http', '$q']

    function GameFactory($http, $q){
      var apiUrl = "/api/games/api/"
      var gameUrl = "/api/games/"
      var deferred = $q.defer()
      var service = {
        allGames: allGames,
        show: show,
        create: create,
        show_game: show_game
      }
      return service
      function allGames(limit, offset){
        return $http.get(apiUrl + "list/" + limit + "/" + offset + "/")
      }
      function show(id){
        return $http.get(apiUrl + id)
      }
      function create(data){
        return $http.post(gameUrl, data)
      }
      function show_game(id){
        return $http.get(gameUrl + id)
      }

    }
})()
