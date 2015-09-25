var myApp = angular.module('myApp', []);

myApp.controller('MyController', function MyController($scope, $http) {

    
	 $scope.stats = [{
        'label': 'str',
        'value': 15
    }, {
        'label': 'dex',
        'value': 12
    }, {
        'label': 'con',
        'value': 10
    }, {
        'label': 'int',
        'value': 10
    }, {
        'label': 'wis',
        'value': 18
    }, {
        'label': 'cha',
        'value': 14
    }];

    $scope.makeCircle =	function(){var bodySelection = d3.select("body");
 
 var svgSelection = bodySelection.append("svg")
       .attr("width", 50)
       .attr("height", 50);
 
 var circleSelection = svgSelection.append("circle")
      .attr("cx", 25)
    .attr("cy", 25)
     .attr("r", 25)
    .style("fill", "purple");
  };



});