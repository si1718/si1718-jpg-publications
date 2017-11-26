var app = angular.module("ArticlesApp");
app.controller("AddCtrl",["$scope", "$http", "$routeParams", "$location", "lockService", "modalService", "propertiesService", 
function function_name($scope, $http, $routeParams, $location, lockService, modalService, propertiesService) {
    $scope.test = "This is a test";
    $scope.buttonAction = "Add";
    $scope.idArticle = $routeParams.idArticle;
    function addArticle(){
        if(lockService.checkLock()){
            modalService.showAlert(propertiesService.ERROR_APP_BUSSY);
            return;
        }
        lockService.blockLock();
        $scope.newArticle.authors = propertiesService.splitAuthors($scope.newArticle.authors);
        $http.post("/api/v1/articles/", $scope.newArticle).then(function(response){
            console.log("added");
            $scope.refresh();
            $scope.clearNewArticle();
            $('.collapse').collapse('hide');
            modalService.showFrom(propertiesService.parseCode(response.status));
            lockService.releaseLock();
        }, function(error){
            console.log("error");
            modalService.showFrom(propertiesService.parseCode(error.status));
            lockService.releaseLock();
        });
    }
    
    function clearNewArticle(){
        $scope.newArticle = {};
    }

    $scope.addArticle = addArticle;
    $scope.clearNewArticle = clearNewArticle;
    clearNewArticle();
}]);