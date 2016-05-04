(function(){
  angular.module("GamerPicks")
    .config(function($stateProvider, $urlRouterProvider, $httpProvider){
      $httpProvider.interceptors.push('authInterceptor')
      $urlRouterProvider.otherwise('/')
      $stateProvider
        // Home State
        .state('featuredGames', {
          url: '/',
          templateUrl: 'partials/featured_games.html',
          controller: 'HomeCtrl as hc'
        })
        // User States
        .state('login', {
          url: '/login',
          templateUrl: 'partials/login.html'
        })
        .state('signup', {
          url: '/users/new',
          templateUrl: 'partials/signup.html'
        })
        .state('profile', {
          url: '/users/:id',
          templateUrl: 'partials/profile.html',
          controller: 'UserCtrl as uc'
        })
        // Category States
        .state('categories', {
          url: '/categories',
          templateUrl: 'partials/categories.html',
          controller: 'CategoryCtrl as cc'
        })
        .state('oneCategory', {
          url: '/categories/:id',
          templateUrl: 'partials/one_category.html',
          controller: 'CategoryDetailCtrl as ccd'
        })
        // Game State
        .state('oneGame', {
          url: '/games/:id',
          templateUrl: 'partials/one_game.html',
          controller: 'GameCtrl as gcc'
        })
          // Review States
        .state('newReview', {
          url: '/games/:id/reviews/new',
          templateUrl: 'partials/new_review.html',
          controller: 'ReviewCtrl as rc'
        })
        .state('oneReview', {
          url: '/games/:id/reviews/:reviewid',
          templateUrl: 'partials/one_review.html',
          controller: 'ReviewCtrl as rc'
        })
        .state('allReviews', {
          url: '/games/:id/reviews',
          templateUrl: 'partials/all_reviews_for_one_game.html',
          controller: 'ReviewCtrl as rc'
        })
        // About State
        .state('about', {
          url: '/about',
          templateUrl: 'partials/about.html'
        })
    })
})()
