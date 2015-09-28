var myApp = angular.module('myApp', []);



myApp.controller('MyController', function MyController($scope, $http) {


    $scope.stats = [{
        'label': 'str',
        'value': 12,
        'color': 'red'
    }, {
        'label': 'dex',
        'value': 10,
        'color': 'orange'
    }, {
        'label': 'con',
        'value': 8,
        'color': 'purple'
    }, {
        'label': 'int',
        'value': 6,
        'color': 'blue'
    }, {
        'label': 'wis',
        'value': 4,
        'color': 'green'
    }, {
        'label': 'cha',
        'value': 2,
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

// myApp.directive('wark', function() {
//     return {
//         restrict: 'A',
//         // scope:false,
//         template: '<div class="wark">This is an example of a directive {{stats[0].value}} </div>'
//     };
// });

myApp.directive('simpleChart', function($window) {
    return {
        restrict: 'EA',

        link: function(scope, elem, attrs) {

            scope.$watch('stat', function() {
                drawSimpleChart();
            }, true);

            var statToDraw = scope[attrs.chartData];


            function drawSimpleChart() {
                var bodySelection = d3.select(elem[0]);
                 // console.log(bodySelection)

                bodySelection.select('*').remove();


                var svgSelection = bodySelection.append("svg")
                    .attr("width", 100)
                    .attr("height", 200);


                var circleSelection = svgSelection.append("circle")
                    .attr("cx", 50)
                    .attr("cy", 50)
                    .attr("r", statToDraw.value * 2)
                    .style("fill", statToDraw.color);

            }
        }
    };
});

myApp.directive('pieChart', function($window) {
    return {
        restrict: 'EA',
        // replace:true,
        link: function(scope, elem, attrs) {

            scope.$watch('stats', function() {
                drawPieChart();
            }, true);

            var statsToDraw = scope[attrs.chartData];


            function drawPieChart() {
                var bodySelection = d3.select(elem[0]);
                console.log(bodySelection)

                bodySelection.selectAll('*').remove();

                var dataset = scope[attrs.chartData];

                var width = 360;
                var height = 360;
                var radius = Math.min(width, height) / 2;
                var color = d3.scale.category20b();

                var svg = bodySelection
                    .append('svg')
                    .attr('width', width)
                    .attr('height', height)
                    .append('g')
                    .attr('transform', 'translate(' + (width / 2) + ',' + (height / 2) + ')');

                var arc = d3.svg.arc()
                    .outerRadius(radius);

                var pie = d3.layout.pie()
                    .value(function(d) {
                        return d.value;
                    })
                    .sort(null);

                var path = svg.selectAll('path')
                    .data(pie(dataset))
                    .enter()
                    .append('path')
                    .attr('d', arc)
                    .attr('fill', function(d, i) {
                        return color(d.data.label);
                    });




            }
        }
    };
});