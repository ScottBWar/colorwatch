var myApp = angular.module('myApp', []);



myApp.controller('MyController', function MyController($scope, $http) {


    $scope.stats = [{
        'label': 'str',
        'value': 12,
        'color': '#c0392b'
    }, {
        'label': 'dex',
        'value': 10,
        'color': '#f39c12'
    }, {
        'label': 'con',
        'value': 8,
        'color': '#9b59b6'
    }, {
        'label': 'int',
        'value': 6,
        'color': '#2980b9'
    }, {
        'label': 'wis',
        'value': 4,
        'color': '#2ecc71'
    }, {
        'label': 'cha',
        'value': 2,
        'color': '#95a5a6'
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


            function drawPieChart() {

                var bodySelection = d3.select(elem[0]);

                bodySelection.selectAll('*').remove();

                var dataset = scope[attrs.chartData];

                var width = 180;
                var height = 180;
                var radius = Math.min(width, height) / 2;

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
                    .attr('fill', function(d) {
                        return d.data.color;
                    });

            }
        }
    };
});

myApp.directive('donutChart', function($window) {
    return {
        restrict: 'EA',
        // replace:true,
        link: function(scope, elem, attrs) {

            scope.$watch('stats', function() {
                drawDonutChart();
            }, true);


            function drawDonutChart() {
                console.log("mmm.. donuts")
                var bodySelection = d3.select(elem[0]);

                bodySelection.selectAll('*').remove();

                var dataset = scope[attrs.chartData];

                var colors = [];

                for(var a = 0; a < dataset.length; a++){
                    colors.push(dataset[a].color);
                }

                console.log(colors);

                //reverse dataset on second graph just looks a little better...
                function reverseDataset() {
                    var retData = new Array;
                    for (var i = dataset.length - 1; i >= 0; i--) {
                        retData.push(dataset[i]);
                    }
                    return retData;
                }
                //
                var legendRectSize = 12;
                var legendSpacing = 4;

                var retData = reverseDataset();

                var width = 180;
                var height = 180;
                var radius = Math.min(width, height) / 2;
                var centerWidth = 30;

                var svg = bodySelection
                    .append('svg')
                    .attr('width', width)
                    .attr('height', height)
                    .append('g')
                    .attr('transform', 'translate(' + (width / 2) + ',' + (height / 2) + ')');

                var arc = d3.svg.arc()
                    .innerRadius(radius - centerWidth)
                    .outerRadius(radius);

                var pie = d3.layout.pie()
                    .value(function(d) {
                        return d.value;
                    })
                    .sort(null);

                var path = svg.selectAll('path')
                    .data(pie(retData))
                    .enter()
                    .append('path')
                    .attr('d', arc)
                    .attr('fill', function(d) {
                        return d.data.color;
                    });

                var legend = svg.selectAll('.legend')
                    .data(colors)
                    .enter()
                    .append('g')
                    .attr('class', 'legend')
                    .attr('transform', function(d, i) {
                        var height = legendRectSize + legendSpacing;
                        var offset = height * colors.length / 2;
                        var horz = -2 * legendRectSize;
                        var vert = i * height - offset;
                        return 'translate(' + horz + ',' + vert + ')';
                    });

                    // var ii = 0;
                legend.append('rect')
                    .attr('width', legendRectSize)
                    .attr('height', legendRectSize)
                    .style('fill', function (d,i){return colors[i]})
                    .style('stroke', function (d,i){return colors[i]});
                    // ii += 1;


            }
        }
    };
});

myApp.directive('barsChart', function($window) {
    return {
        restrict: 'EA',
        // replace:true,
        link: function(scope, elem, attrs) {

            scope.$watch('stats', function() {
                drawBarsChart();
            }, true);


            function drawBarsChart() {
                var bodySelection = d3.select(elem[0]);

                bodySelection.selectAll('*').remove();

                var dataset = scope[attrs.chartData];






            }
        }
    };
});