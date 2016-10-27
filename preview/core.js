var app = angular.module('app', ['offClick']);

app.controller('IconsCtrl', function($scope, $http) {

var vm = this;
vm.dataLoaded = false;
vm.list = [];
vm.popover = true;

$http.get('../icons.json')
 .then(function(res){
    angular.forEach(res.data.sets, function(obj){
      vm.list.push(obj)
    })
    vm.selected = vm.list[0];
    vm.get();
  });


vm.get = function() {
  vm.dataLoaded = false;
  name = vm.selected.name
  $http.get('../fonts/'+name+'/'+name+'.json')
    .then(function(response){
      console.log(response.data)
      vm.selected.icons = response.data;
      vm.dataLoaded = true;
    });
}


//
//
// $http.get('../icons.json')
//  .then(function(res){
//     vm.data = res.data.sets;
//     vm.get(res.data.sets[0].name)
//     console.log('icons: ', res.data.sets[0])
//   });


});
