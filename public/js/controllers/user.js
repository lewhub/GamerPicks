(function(){
  angular.module('GamerPicks')
    .controller('UserCtrl', UserCtrl)

    function UserCtrl($scope, userFactory, $window){
      var self = this
      self.currUser = $window.localStorage['currentUserID']
      // console.log(100, self.currUser)
      if (self.currUser){
        userFactory.show(self.currUser).success(function(results){
          self.user = results.user
        })
      }
    }
})()
