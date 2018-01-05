angular.module("ArticlesApp").controller("NewListCtrl",["$scope", "$http", "$httpParamSerializer", "$location", "lockService", "modalService", "propertiesService",
function function_name($scope, $http, $httpParamSerializer, $location, lockService, modalService, propertiesService) {
    $scope.test = "This is a test";
    
    function refresh(){
        return searchArticle();
    }
    
    function editArticle(){
        if(undefined === $scope.idSelected){
            return;
        }
        $location.path("/newarticles/" + $scope.idSelected);
    }
    
    function doSearchArticle(){
        $scope.limit = 10;
        $scope.skip = 0;
        $scope.pageNumber = 0;
        $scope.isFirst = true;
        $scope.isLast = false;
        searchArticle();
    }
    
    function searchArticle(){
        $scope.articleToSearch.limit = $scope.limit;
        $scope.articleToSearch.skip = $scope.skip;
        var querySerial = $httpParamSerializer($scope.articleToSearch);
        $http.get("/api/v1/newArticles/?" +  querySerial).then(function(response){
            $scope.articles = response.data;
            if(response.data.length < $scope.limit ){
                $scope.isLast = true;
            } else {
                $scope.isLast = false;
            }
        }, function(error){
            console.log("error");
            modalService.showFrom(propertiesService.parseCode(error.status));
        });
    }
    function setSelected(idSelected){
        $scope.idSelected = idSelected;
    }
    function clearSearchArticle(){
        $scope.articleToSearch = {};
    }
    
    function nextPage(){
        if($scope.isLast){
            return;
        }
        $scope.skip = $scope.skip + $scope.limit;
        $scope.pageNumber += 1; 
        $scope.isFirst = false;
        searchArticle();
    }
    
    function previousPage(){
        if($scope.isFirst){
            return;
        }
        $scope.skip = $scope.skip - $scope.limit;
        if($scope.skip <= 0){
            $scope.skip = 0;
            $scope.isFirst = true;
        }
        $scope.pageNumber -= 1;
        if($scope.pageNumber < 0){
            $scope.pageNumber = 0;
        }
        $scope.isLast = false;
        searchArticle();
    }
    
    $scope.setSelected = setSelected;
    $scope.refresh = refresh;
    $scope.editArticle = editArticle;
    $scope.clearSearchArticle = clearSearchArticle;
    $scope.searchArticle = doSearchArticle;
    $scope.nextPage = nextPage;
    $scope.previousPage = previousPage;
    $scope.limit = 10;
    $scope.skip = 0;
    $scope.pageNumber = 0;
    $scope.isFirst = true;
    $scope.isLast = false;
    
    clearSearchArticle();
    refresh();
}]);