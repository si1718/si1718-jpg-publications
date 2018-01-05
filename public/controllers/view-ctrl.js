angular.module("ArticlesApp").controller("ViewCtrl",["$scope", "$http", "$routeParams", "$location", "lockService", "modalService", "propertiesService", 
function function_name($scope, $http, $routeParams, $location, lockService, modalService, propertiesService) {
    $scope.test = "This is a test";
    $scope.buttonAction = "Update";
    $scope.idArticle = $routeParams.idArticle;
    function refresh(idArticle){
        $http.get("/api/v1/articles/" + idArticle).then(function(response){
            $scope.article = response.data[0];
        });
    }
    
    function cancel(){
        $location.path("/");
    }
    
    refresh($scope.idArticle);
    $scope.refresh = refresh;
    $scope.cancel = cancel;
}]);