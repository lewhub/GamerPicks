(function(){
  angular.module('GamerPicks')
    .controller('CategoryDetailCtrl', CategoryDetailCtrl)

    CategoryDetailCtrl.$inject = ['CategoryFactory', '$stateParams']

    function CategoryDetailCtrl(CategoryFactory, $stateParams){
      var self = this
      self.title = "Category Detail View"
      CategoryFactory.show($stateParams.id).then(function(response){
        self.category = response.data.category
      })
    }

})()
