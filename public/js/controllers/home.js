(function(){
  angular.module('GamerPicks')
    .controller('HomeCtrl', HomeCtrl)


    function HomeCtrl(){
      var self = this
      self.title = 'Featured Games'
    }
})()
