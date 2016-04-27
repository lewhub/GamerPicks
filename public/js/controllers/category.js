(function(){
  angular.module('GamerPicks')
    .controller('CategoryCtrl', CategoryCtrl)


    function CategoryCtrl(){
      var self = this
      self.title = 'All Categories'
    }
})()
