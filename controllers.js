var myApp = angular.module('myApp', []);



myApp.controller('MyController', function MyController($scope, $http) {


    $scope.stats = [{
        'label': 'str',
        'value': 20,
        'color': 'red'
    }, {
        'label': 'dex',
        'value': 18,
        'color': 'orange'
    }, {
        'label': 'con',
        'value': 14,
        'color': 'purple'
    }, {
        'label': 'int',
        'value': 12,
        'color': 'blue'
    }, {
        'label': 'wis',
        'value': 8,
        'color': 'green'
    }, {
        'label': 'cha',
        'value': 4,
        'color': 'pink'
    }];

    $scope.makeCircle = function(stat) {
        var bodySelection = d3.select("#blank");

        var svgSelection = bodySelection.append("svg")
            .attr("width", 100)
            .attr("height", 100);

        var circleSelection = svgSelection.append("circle")
            .attr("cx", 50)
            .attr("cy", 50)
            .attr("r", stat.value * 2)
            .style("fill", stat.color);

    };

    $scope.increaseStat = function(stat) {
        stat.value += 1;
    };


    $scope.decreaseStat = function(stat) {
        stat.value -= 1;
    };



    $scope.makeSpectrum = function() {

        for (var i = 0; i < $scope.stats.length; i++) {
            $scope.makeCircle($scope.stats[i]);
        }

    };

});

myApp.directive('wark', function() {
    return {
        restrict: 'A',
        // scope:false,
        template: '<div class="wark">WARK! WARK! {{stats[0].label}} </div>'
    };
});

myApp.directive('simpleChart', function($window) {
    return {
        restrict: 'EA',
        // scope: {
        //     data: '=' // bi-directional data-binding
        // },
        // template: "<svg width='850' height='200'></svg>",
        link: function(scope, elem, attrs) {

            scope.$watch('stat', function() {
               
                drawSimpleChart();

            }, true);


            var statToDraw = scope[attrs.chartData];

            // scope.$watch('dataToPlot', function(newVals, oldVals) {
            //     return drawSimpleChart(newVals);
            // }, true);

            function drawSimpleChart() {
                var bodySelection = d3.select(elem[0]);

                bodySelection.selectAll('*').remove();



                var svgSelection = bodySelection.append("svg")
                    .attr("width", 100)
                    .attr("height", 100);



                var circleSelection = svgSelection.append("circle")
                    .attr("cx", 50)
                    .attr("cy", 50)
                    .attr("r", statToDraw.value * 2)
                    .style("fill", statToDraw.color);

            }

            // drawSimpleChart();
        }


    };
});

// myApp.directive('circles', function() {
//   return {
//     restrict: 'A',
//     // scope:false,
//     template: '<script>makeSpectrum();</script>'
//   };
// });