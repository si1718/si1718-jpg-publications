angular.module("ArticlesApp").controller("ChartCtrl",["$scope", "$http", "$httpParamSerializer", "$location", "lockService", "modalService", "propertiesService",
function function_name($scope, $http, $httpParamSerializer, $location, lockService, modalService, propertiesService) {
    
    function refreshChart(){
        $http.get("/api/v1/articles/").then(function(response){
            var articles = response.data;
            var yearMap = {};
            
            for(var index in articles){
                var article = articles[index];
                var year = article.year;
                if(typeof(year) === "number"){
                    if(yearMap[year] === undefined){
                        yearMap[year] = 1;
                    } else {
                        yearMap[year] =  yearMap[year] + 1;
                    }
                }
            }
            console.log(yearMap);
            var years = [];
            
            for(var year in yearMap){
                years.push(year);
            }
            var numbers = new Array(years.length);
            years.sort();
            for(var index in yearMap){
                var pos = years.indexOf(index);
                numbers[pos] = yearMap[index];
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