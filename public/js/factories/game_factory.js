(function(){
  angular.module('GamerPicks')
    .factory('GameFactory', GameFactory)

    GameFactory.$inject = ['$http']

    function GameFactory($http){
      var apiUrl = "https://www.igdb.com/api/v1/games/?limit=50"
      var config = {
        headers: { Authorization: "Token token='G5HDgxEsCEb0QRrZEIUtt3zgdcqbm-Ib3gqRa0MdO1s'" }
      }
      var service = {
        allGames: allGames
      }
      return service

      function allGames(){
        return $http.get(apiUrl, [config])
      }
    }

})()
