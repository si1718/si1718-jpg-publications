angular.module("ArticlesApp").controller("AddCtrl",["$scope", "$http", "$httpParamSerializer", "$routeParams", "$location", "lockService", "modalService", "propertiesService", 
function function_name($scope, $http, $httpParamSerializer, $routeParams, $location, lockService, modalService, propertiesService) {
    $scope.test = "This is a test";
    $scope.buttonAction = "Add";
    $scope.idArticle = $routeParams.idArticle;
    function addArticle(){
        if(!($scope.newArticle.authors instanceof Array)){
            $scope.newArticle.authors = propertiesService.splitCSV($scope.newArticle.authors);
        }
        if($scope.newArticle.keywords && !($scope.newArticle.keywords instanceof Array)){
           $scope.newArticle.keywords = propertiesService.splitCSV($scope.newArticle.keywords); 
        }
        if(lockService.checkLock()){
            modalService.showAlert(propertiesService.ERROR_APP_BUSSY);
            return;
        }
        lockService.blockLock();
        $http.post(propertiesService.DEFAULT_API_URI, $scope.newArticle).then(function(response){
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
        $scope.newArticle.authors = [];
        $scope.newArticle.authors.push({});
        $('.addCls').prop('disabled', false);
        $('.addAutCls').prop('disabled', false);
    }
    
    function addNewAuthor(){
        $scope.newArticle.authors.push({});
    }
    
    function removeNewAuthor(index){
        $scope.newArticle.authors.splice(index, 1);
    }

    $scope.addArticle = addArticle;
    $scope.clearNewArticle = clearNewArticle;
    $scope.addNewAuthor = addNewAuthor;
    $scope.removeNewAuthor = removeNewAuthor;
    clearNewArticle();
}]);