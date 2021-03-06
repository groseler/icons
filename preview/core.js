var app = angular.module('app', ['offClick']);

app.controller('IconsCtrl', function($scope, $http) {

var vm = this;
vm.dataLoaded = false;
vm.list = [];
vm.popover = false;

iconsJson = "icons.json";
iconsUrl = "fonts/";

$http.get(iconsJson)
 .then(function(res){
    angular.forEach(res.data.sets, function(obj){
      vm.list.push(obj)
    })
    vm.selected = vm.list[6];
    vm.get();
  });


vm.get = function() {
  vm.dataLoaded = false;
  name = vm.selected.name
  $http.get(iconsUrl+name+'/'+name+'.json')
    .then(function(response){
      // console.log(response.data)
      vm.selected.icons = response.data;
      vm.dataLoaded = true;
      vm.popover = false;
    });
}

});
