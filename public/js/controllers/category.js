(function(){
  angular.module('GamerPicks')
    .controller('CategoryCtrl', CategoryCtrl)

    CategoryCtrl.$inject = ['CategoryFactory']

    function CategoryCtrl(CategoryFactory){
      var self = this
      self.title = 'All Categories'
      CategoryFactory.index().success(function(response){
        self.categories = response.categories
      })
    }
})()
