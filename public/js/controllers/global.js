(function(){
  angular.module('GamerPicks')
    .controller('GlobalCtrl', GlobalCtrl)
    GlobalCtrl.$inject = ['userFactory', 'authFactory', '$rootScope', '$state', '$window']

    function GlobalCtrl(userFactory, authFactory, $rootScope, $state, $window){
      var self = this
      self.loginInfo = {}
      self.signupInfo = {}

      $rootScope.$on('$stateChangeStart', function(event, toState, toParams, fromState){
        // console.log(toState)
        if (toState.name === "profile" && !self.isAuthed()){
          event.preventDefault()
          $state.go('login')
        }
        if (toState.name === "login" && self.isAuthed() || toState.name === "signup" && self.isAuthed()){
          event.preventDefault()
          console.log(900, fromState)
          $state.go(fromState.name)
        }

      })

      // user functions
      self.login = function(){
        userFactory.login(self.loginInfo)
          .then(handleRequest, handleRequest)
      }
      self.signup = function(){
        userFactory.signup(self.signupInfo)
          .then(handleRequest, handleRequest)
      }
      self.logout = function(){
        authFactory.logout && authFactory.logout()
        $state.go('login')
      }
      self.isAuthed = function(){
        return authFactory.isAuthed ? authFactory.isAuthed() : false
      }
      // handle request
      function handleRequest(response){
        console.log(800, response.data.success, response.data.message)
        if (response.config.url === "/api/users/login" && response.data.success){
          $state.go('profile')
        }
        if (response.config.url === "/api/users/" && response.data.success){
          $state.go('profile')
        }
        var token = response.data ? response.data.token : null
        if (token) {
          //  console.log(20, 'JWT:', token)
          //  console.log(30, response.data.user)
           $window.localStorage['currentUserID'] = response.data.user._id
         }
        self.message = response.data.message
        self.loginInfo = {}
        self.signupInfo = {}
      }
    }
})()
