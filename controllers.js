var myApp = angular.module('myApp', []);

myApp.controller('MyController', function MyController($scope, $http) {


    $scope.stats = [{
        'label': 'str',
        'value': 8
    }, {
        'label': 'dex',
        'value': 8
    }, {
        'label': 'con',
        'value': 8
    }, {
        'label': 'int',
        'value': 8
    }, {
        'label': 'wis',
        'value': 8
    }, {
        'label': 'cha',
        'value': 8
    }];
});