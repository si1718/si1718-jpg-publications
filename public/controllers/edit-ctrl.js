angular.module("ArticlesApp").controller("EditCtrl",["$scope", "$http", "$routeParams", "$location", "lockService", "modalService", "propertiesService", 
function function_name($scope, $http, $routeParams, $location, lockService, modalService, propertiesService) {
    $scope.test = "This is a test";
    $scope.buttonAction = "Update";
    $scope.idArticle = $routeParams.idArticle;
    function refresh(idArticle){
        $http.get("/api/v1/articles/" + idArticle).then(function(response){
            $scope.article = response.data[0];
        });
    }
    function updateArticle(){
        if(!($scope.article.authors instanceof Array)){
            $scope.article.authors = propertiesService.splitCSV($scope.article.authors);
        }
        if($scope.article.keywords && !($scope.article.keywords instanceof Array)){
           $scope.article.keywords = propertiesService.splitCSV($scope.article.keywords); 
        }
        if(lockService.checkLock()){
            modalService.showAlert(propertiesService.ERROR_APP_BUSSY);
            return;
        }
        lockService.blockLock();
        $http.put("/api/v1/articles/" + $scope.idArticle, $scope.article).then(function(response){
            console.log("updated");
            $location.path("/");
            modalService.showInfo(propertiesService.INFO_UPDATED);
            lockService.releaseLock();
        }, function(error){
            console.log("error");
            modalService.showFrom(propertiesService.parseCode(error.status));
            lockService.releaseLock();
        });
    }
    
    function cancel(){
        $location.path("/");
    }
    
    function addEditAuthor(){
        $scope.article.authors.push({});
    }
    
    function removeEditAuthor(index){
        $scope.article.authors.splice(index, 1);
    }
    
    refresh($scope.idArticle);
    $scope.refresh = refresh;
    $scope.updateArticle = updateArticle;
    $scope.cancel = cancel;
    $scope.addEditAuthor = addEditAuthor;
    $scope.removeEditAuthor = removeEditAuthor;
}]);