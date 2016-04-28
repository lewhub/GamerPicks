(function(){
  angular.module('GamerPicks')
    .controller('GameCtrl', GameCtrl)

    GameCtrl.$inject = ['GameFactory']

    function GameCtrl(gameFactory){
      var self = this
      self.title = 'all games'

      gameFactory.allGames().success(function(results){
        console.log(results)
      })
      .error(function(){
        console.log('results')
      })


    }
})()
