angular.module("ArticlesApp").controller("ValidatorCtrl",["$scope", "$http", "$httpParamSerializer", "$routeParams", "$location", "lockService", "modalService", "propertiesService", 
function function_name($scope, $http, $httpParamSerializer, $routeParams, $location, lockService, modalService, propertiesService) {

    function unvalidateJournal(buttonToblock, fieldToBlock, objectName, classToClear){
        $('#' + buttonToblock).prop('disabled', false);
        $('#' + fieldToBlock).prop('disabled', false);
        objectName.journalIssn = undefined;
        objectName.journalTitle = undefined;
        objectName.journal = "";
        $(classToClear).prop('disabled', false);
    }
    
    function validateJournal(buttonToblock, fieldToBlock, objectName){
        if(!buttonToblock || !fieldToBlock || !objectName){
            modalService.showAlert(propertiesService.ERROR_JOURNAL_ERROR);
        } else {
            //DEFAULT_JOURNAL_URI
            var journalId = objectName.journal;
            if(((typeof(journalId) !== "string") && !(journalId instanceof String)) || journalId === ""){
                modalService.showAlert(propertiesService.ERROR_JOURNAL_ERROR_EMPTY);
                return;
            }
            if(lockService.checkLock()){
                modalService.showAlert(propertiesService.ERROR_APP_BUSSY);
                return;
            }
            lockService.blockLock();
            $http.get(propertiesService.DEFAULT_JOURNAL_URI + "search?title=" + encodeURIComponent(journalId)).then(function(response){
                console.log("Journal found, Status: " + response.status);
                console.log(response.data);
                if(response.status === propertiesService.CODE_SUCESS){
                    if(response.data.length > 0){
                        var journal = response.data[0];
                        objectName.journalIssn = journal.issn;
                        objectName.journalTitle = journal.title;
                        //Close the gate!!
                        $('#' + buttonToblock).prop('disabled', true);
                        $('#' + fieldToBlock).prop('disabled', true);
                        objectName.journal = propertiesService.DEFAULT_JOURNAL_URI + journal.idJournal;
                        modalService.showInfo(propertiesService.INFO_JOURNAL_VALID + "\nTitle: " + journal.title + "\nIssn: " + journal.issn);
                    } else {
                        modalService.showAlert(propertiesService.ERROR_JOURNAL_NOT_FOUND);
                    }
                } else {
                    modalService.showAlert(propertiesService.ERROR_JOURNAL_CANNOT_VALIDATE);
                }
                lockService.releaseLock();
            }, function(error){
                console.log("Error searchong journal, Status: " + error.status);
                lockService.releaseLock();
                if(error.status === propertiesService.CODE_NOT_FOUND){
                    modalService.showAlert(propertiesService.ERROR_JOURNAL_NOT_FOUND);
                } else {
                    modalService.showAlert(propertiesService.ERROR_JOURNAL_ERROR);
                }
            });
        }
    }
    
    function validateAuthor(buttonToblock, fieldToBlock, index, objectName){
        console.log(buttonToblock + " : " + fieldToBlock + " : " + index + " : " + objectName);
        if(!buttonToblock || !fieldToBlock || !objectName || index === undefined){
            modalService.showAlert(propertiesService.ERROR_AUTHOR_ERROR);
        } else {
            var authorName = objectName.authors[index].name;
            if(((typeof(authorName) !== "string") && !(authorName instanceof String)) || authorName === ""){
                modalService.showAlert(propertiesService.ERROR_AUTHOR_ERROR_EMPTY);
                return;
            }
            if(lockService.checkLock()){
                modalService.showAlert(propertiesService.ERROR_APP_BUSSY);
                return;
            }
            lockService.blockLock();
            $http.get(propertiesService.DEFAULT_AUTHOR_URI + "?search=" + encodeURIComponent(authorName)).then(function(response){
                console.log("Author found, Status: " + response.status);
                console.log(response.data);
                if(response.status === propertiesService.CODE_SUCESS){
                    if(response.data.length > 0){
                        var author = response.data[0];
                        objectName.authors[index].name = author.name;
                        objectName.authors[index].author = propertiesService.DEFAULT_AUTHOR_URI + author.idResearcher;
                        //Close the gate!!
                        $('#' + buttonToblock).prop('disabled', true);
                        $('#' + fieldToBlock).prop('disabled', true);
                        modalService.showInfo(propertiesService.INFO_AUTHOR_VALID + "\nName: " + author.name + "\nId: " + author.idResearcher);
                    } else {
                        modalService.showAlert(propertiesService.ERROR_AUTHOR_NOT_FOUND);
                    }
                } else {
                    modalService.showAlert(propertiesService.ERROR_AUTHOR_CANNOT_VALIDATE);
                }
                lockService.releaseLock();
            }, function(error){
                console.log("Error searching author, Status: " + error.status);
                lockService.releaseLock();
                if(error.status === propertiesService.CODE_NOT_FOUND){
                    modalService.showAlert(propertiesService.ERROR_AUTHOR_NOT_FOUND);
                } else {
                    modalService.showAlert(propertiesService.ERROR_AUTHOR_ERROR);
                }
            });
        }
    }
    
    $scope.validateJournal = validateJournal;
    $scope.unvalidateJournal = unvalidateJournal;
    $scope.validateAuthor = validateAuthor;
}]);