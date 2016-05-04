(function(){
  angular.module('GamerPicks')
    .controller('GameCtrl', GameCtrl)

    GameCtrl.$inject = ['GameFactory', 'CategoryFactory', '$stateParams']

    function GameCtrl(gameFactory, categoryFactory, $stateParams){
      var self = this
      self.gamesArr = []
      self.title = 'one game'

      gameFactory.show_game($stateParams.id).then(function(response){
        self.game_result = response.data.game
      })


      // getting all categories
      // categoryFactory.index().then(function(response){
      //   self.categories = response.data.categories
      //   self.categories.forEach(function(c){
      //     switch (c.name){
      //       case "Adventure":
      //         self.adventure = c._id
      //         break
      //       case "Arcade":
      //         self.arcade = c._id
      //         break
      //       case "Fighting":
      //         self.fighting = c._id
      //         break
      //       case "Indie":
      //         self.indie = c._id
      //         break
      //       case "Music":
      //         self.music = c._id
      //         break
      //       case "Pinball":
      //         self.pinball = c._id
      //         break
      //       case "Platform":
      //         self.platformc = c._id
      //         break
      //       case "Point-and-click":
      //         self.point_and_click = c._id
      //         break
      //       case "Puzzle":
      //         self.puzzle = c._id
      //         break
      //       case "Quiz/Trivia":
      //         self.quiz = c._id
      //         break
      //       case "Racing":
      //         self.racing = c._id
      //         break
      //       case "Real Time Strategy (RTS)":
      //         self.rts = c._id
      //         break
      //       case "Role-playing (RPG)":
      //         self.rpg = c._id
      //         break
      //       case "Shooter":
      //         self.shooter = c._id
      //         break
      //       case "Simulator":
      //         self.simulator = c._id
      //         break
      //       case "Sport":
      //         self.sport = c._id
      //         break
      //       case "Strategy":
      //         self.strategy = c._id
      //         break
      //       case "Tactical":
      //         self.tactical = c._id
      //         break
      //       case "Turn-based strategy (TBS)":
      //         self.tbs = c._id
      //         break
      //       case "Hack and slash/Beat 'em up":
      //         self.hs = c._id
      //         break
      //       default:
      //         self.other = c._id
      //     }
      //     //console.log(203, c.name)
      //
      //   })
      //   self.show_game(844)
      // })

      // adding games to api
      // self.show_game = function(num){
      //   gameFactory.show(num).then(function(response){
      //     var newGame = {}
      //     // category
      //     //console.log(response.data.game)
      //     if (response.data.game.genres) {
      //       switch (response.data.game.genres[0].name){
      //         case "Adventure":
      //           newGame.category = self.adventure
      //           break
      //         case "Arcade":
      //           newGame.category = self.arcade
      //           break
      //         case "Fighting":
      //           newGame.category = self.fighting
      //           break
      //         case "Indie":
      //           newGame.category = self.indie
      //           break
      //         case "Music":
      //           newGame.category = self.music
      //           break
      //         case "Pinball":
      //           newGame.category = self.pinball
      //           break
      //         case "Platform":
      //           newGame.category = self.platformc
      //           break
      //         case "Point-and-click":
      //           newGame.category = self.point_and_click
      //           break
      //         case "Puzzle":
      //           newGame.category = self.puzzle
      //           break
      //         case "Quiz/Trivia":
      //           newGame.category = self.quiz
      //           break
      //         case "Racing":
      //           newGame.category = self.racing
      //           break
      //         case "Real Time Strategy (RTS)":
      //           newGame.category = self.rts
      //           break
      //         case "Role-playing (RPG)":
      //           newGame.category = self.rpg
      //           break
      //         case "Shooter":
      //           newGame.category = self.shooter
      //           break
      //         case "Simulator":
      //           newGame.category = self.simulator
      //           break
      //         case "Sport":
      //           newGame.category = self.sport
      //           break
      //         case "Strategy":
      //           newGame.category = self.strategy
      //           break
      //         case "Tactical":
      //           newGame.category = self.tactical
      //           break
      //         case "Turn-based strategy (TBS)":
      //           newGame.category = self.tbs
      //           break
      //         case "Hack and slash/Beat 'em up":
      //           newGame.category = self.hs
      //           break
      //         default:
      //           console.log('err')
      //       }
      //     } else {
      //       newGame.category = self.other
      //     }
      //
      //
      //     // name
      //     newGame.name = response.data.game.name
      //
      //     // api game id
      //     newGame.api_id = response.data.game.id
      //
      //     // photo
      //     if (response.data.game.cover){
      //       var photo = response.data.game.cover.url.split('/')
      //       photo.splice(6, 1, 't_cover_big_2x')
      //       newGame.photo = photo.join('/')
      //     } else {
      //       newGame.photo = "no photo"
      //     }
      //
      //
      //     // console.log(response.data.game.genres[0].name) // game category name
      //     // console.log(response.data.game.name) // game name
      //     //  console.log(photo.join('/')) // game photo
      //
      //     if (response.data.game.summary){
      //       newGame.game_summary = response.data.game.summary
      //       //console.log(response.data.game.summary) // game summary
      //     } else {
      //       newGame.game_summary = "no game summary"
      //       //console.log('no game summary') // game summary if no summary from api
      //     }
      //
      //     gameFactory.create( newGame ).then(function( response ) {
      //       console.log(254, response.data.game)
      //
      //       if (num < 1000) {
      //         self.show_game(num + 1)
      //       }
      //     })
      //     // console.log(190, newGame)
      //   })
      // }






      self.one_game = function(id){
        return new Promise(function(resolve, reject){
          if (id){
            resolve(gameFactory.show(id).then(function(result){
                  // console.log(result.data.game)
                  // console.log('done')
                  console.log(result.data.game)
                }))
          }
          else {
            reject(console.log('error happended'))
          }
        })
      }

      // gameFactory.allGames(5, 0).success(function(data){
      //   var i = 0
      //   while (i < data.games.length){
      //     self.one_game(data.games[i].id).then(function(){console.log('done')}).catch(function(){console.log('err')})
      //     i += 1
      //   }
      // })

      // entire database
      // gameFactory.allGames(1000, 0).success(function(data){
      //   console.log(1, data)
      // })
      // gameFactory.allGames(1000, 1000).success(function(data){
      //   console.log(2, data)
      // })
      // gameFactory.allGames(1000, 2000).success(function(data){
      //   console.log(3, data)
      // })
      // gameFactory.allGames(1000, 3000).success(function(data){
      //   console.log(4, data)
      // })
      // gameFactory.allGames(1000, 4000).success(function(data){
      //   console.log(5, data)
      // })
      // gameFactory.allGames(1000, 5000).success(function(data){
      //   console.log(6, data)
      // })
      // gameFactory.allGames(1000, 6000).success(function(data){
      //   console.log(7, data)
      // })
      // gameFactory.allGames(1000, 7000).success(function(data){
      //   console.log(8, data)
      // })
      // gameFactory.allGames(1000, 8000).success(function(data){
      //   console.log(9, data)
      // })
      // gameFactory.allGames(1000, 9000).success(function(data){
      //   console.log(10, data)
      // })
      // gameFactory.allGames(1000, 10000).success(function(data){
      //   console.log(11, data)
      // })
      // gameFactory.allGames(1000, 11000).success(function(data){
      //   console.log(12, data)
      // })
      // gameFactory.allGames(1000, 12000).success(function(data){
      //   console.log(13, data)
      // })
      // gameFactory.allGames(1000, 13000).success(function(data){
      //   console.log(14, data)
      // })
      // gameFactory.allGames(1000, 14000).success(function(data){
      //   console.log(15, data)
      // })
      // gameFactory.allGames(1000, 15000).success(function(data){
      //   console.log(16, data)
      // })
      // gameFactory.allGames(1000, 16000).success(function(data){
      //   console.log(17, data)
      // })
      // gameFactory.allGames(967, 17000).success(function(data){
      //   console.log(17, data)
      // })


    }
})()
