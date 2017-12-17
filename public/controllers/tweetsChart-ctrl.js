angular.module("ArticlesApp").controller("TweetChartCtrl",["$scope", "$http", "$httpParamSerializer", "$location", "lockService", "modalService", "propertiesService",
function function_name($scope, $http, $httpParamSerializer, $location, lockService, modalService, propertiesService) {
    
    $scope.keywords = [];
    $scope.keywordSelected = "";
    $scope.reportType = "day";
    
    function dateFromDay(year, day){
        var date = new Date(year, 0); // initialize a date in `year-01-01`
        if($scope.reportType === "month"){
            date = new Date(date.setMonth(day - 1));
        } else {
            date = new Date(date.setDate(day));
        }
        var day = date.getDate();
        var month = date.getMonth() + 1;
        var year = date.getFullYear();
        if($scope.reportType === "month"){
            return month + '/' + year;
        }
        return day + '/' + month + '/' + year;
    }
    
    function initChart(){
        $http.get("/api/v1/keywords/").then(function(response){
           var filter = [];
           for(var key in response.data){
               if(response.data[key] !== null){
                   filter.push(response.data[key].trim().toLowerCase());
               }
           }
           $scope.keywords = filter;
           if(filter.length > 0){
               $scope.keywordSelected = filter[0];
               refreshChart(filter[0]);
           }
        }, function(error){
            console.log("error loading chart");
            modalService.showAlert(propertiesService.ERROR_CHART_CANNOT_LOAD);
        });
    }
    
    function refreshChart(keyword){
        if(keyword === undefined){
            keyword = $scope.keywordSelected;
        }
        var type;
        if($scope.reportType === "month"){
            type = "tweetMonth";
        } else {
            type = "tweet";
        }
        $http.get("/api/v1/reports?keyword=" + keyword + "&type=" + type).then(function(response){
            var reports = response.data;
            var yearMap = {};
            
            for(var index in reports){
                var report = reports[index];
                var year = report.report_year;
                if(yearMap[year] === undefined){
                        yearMap[year] = {};
                }
                yearMap[year][report.report_day] = report.statistic;
            }
            console.log(yearMap);
            var years = [];

            for(var year in yearMap){
                years.push(year);
            }
            var dates = new Array(0);
            var values = new Array(0);
            years.sort();
            for(var index in years){
                var year = years[index];
                var days = new Array(0);
                for(var day in yearMap[year]){
                    days.push(day);
                }
                days.sort();
                for(var day in yearMap[year]){
                    dates.push(dateFromDay(year, day));
                    values.push(yearMap[year][day]);
                }
            }
            console.log(dates);
            console.log(values);
            fillChart(dates, values);
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
                text: 'Number of tweets per day'
            },
            subtitle: {
                text: 'Source: twitter'
            },
            xAxis: {
                categories: years
            },
            yAxis: {
                title: {
                    text: 'Number of tweets'
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
                name: 'Tweets',
                data: datas
                }]
        });
    }
    
    $scope.refreshChart = refreshChart;
    initChart();
}]);