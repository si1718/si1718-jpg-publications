angular.module("ArticlesApp").controller("ChartCtrl",["$scope", "$http", "$httpParamSerializer", "$location", "lockService", "modalService", "propertiesService",
function function_name($scope, $http, $httpParamSerializer, $location, lockService, modalService, propertiesService) {
    
    function refreshChart(){
        $http.get("/api/v1/articlesGraph/").then(function(response){
            var dataGraph = response.data;
            
            var years = [];
            
            for(var index in dataGraph){
                var data = dataGraph[index];
                var year = data.year;
                if(typeof(year) === "number"){
                    years.push(year);
                }
            }
            
            var numbers = new Array(years.length);
            years.sort();
            
            for(var index in dataGraph){
                var data = dataGraph[index];
                var number = data.number;
                var year = data.year;
                if(typeof(year) === "number"){
                    var pos = years.indexOf(year);
                    if(typeof(number) === "number"){
                        numbers[pos] = number;
                    } else {
                        numbers[pos] = 0;
                    }
                }
            }
            
            console.log(years);
            console.log(numbers);
            fillChart(years, numbers);
        }, function(error){
            console.log("error loading chart");
            modalService.showAlert(propertiesService.ERROR_CHART_CANNOT_LOAD);
        });
    }
    
    function fillChart(years, datas){
        Highcharts.chart('container', {
            chart: {
                type: 'line'
            },
            title: {
                text: 'Number of articles per year'
            },
            subtitle: {
                text: 'Source: SISIUS'
            },
            xAxis: {
                categories: years
            },
            yAxis: {
                title: {
                    text: 'Number of articles'
                }
            },
            plotOptions: {
                line: {
                    dataLabels: {
                        enabled: true
                    },
                    enableMouseTracking: false
                }
            },
            series: [{
                name: 'Articles',
                data: datas
                }]
        });
    }
    
    $scope.refreshChart = refreshChart;
    refreshChart();
}]);