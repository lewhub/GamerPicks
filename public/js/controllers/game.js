(function(){
  angular.module('GamerPicks')
    .controller('GameCtrl', GameCtrl)

    GameCtrl.$inject = ['GameFactory']

    function GameCtrl(gameFactory){
      var self = this
      self.title = 'all games'

      gameFactory.allGames().success(function(data){
        self.theData = data
        console.log(200, data)
      })
      .error(function(err){
        self.theErr = err
        // console.log(300, angular.callbacks._0)
      })


    }
})()
