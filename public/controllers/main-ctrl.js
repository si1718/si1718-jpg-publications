function LockService() {
    var lock = false;

    this.checkLock = function () {
        return lock;
    }

    this.releaseLock = function () {
        lock = false;
    }

    this.blockLock = function () {
        lock = true;
    }
};

function ModalService(){
    var MODAL_NAME = "#systemModal";
    var MODAL_HEADER = "#systemModalHeader";
    var MODAL_TEXT = "#systemModalText";
    
    this.showFrom = function (args){
        $(MODAL_HEADER).text(args["header"]);
        $(MODAL_TEXT).text(args["msg"]);
        //Change color
        $(MODAL_NAME).modal("show");
    }
    
    this.showAlert = function(msg, header = "Error"){
         $(MODAL_HEADER).text(header);
         $(MODAL_TEXT).text(msg);
         //Change color
         $(MODAL_NAME).modal("show");
    };
    
    this.showInfo = function(msg, header = "Info"){
        $(MODAL_HEADER).text(header);
        $(MODAL_TEXT).text(msg);
        //Change color
        $(MODAL_NAME).modal("show");
    };
    
    this.openModal = function (){
        $(MODAL_NAME).modal("show");
    };
    
    this.closeModal = function (){
        $(MODAL_NAME).modal("hide");
    };
}

function PropertiesService(){
    var HEADER_INFO = "Info";
    this.HEADER_INFO = HEADER_INFO;
    var HEADER_ERROR = "Error";
    this.HEADER_ERROR = HEADER_ERROR;
    
    var INFO_SUCESS = "Operation completed successfully";
    this.INFO_SUCESS = INFO_SUCESS;
    var INFO_CREATED = "Article added";
    this.INFO_CREATED = INFO_CREATED;
    var INFO_NO_CONTENT = "There is no content";
    this.INFO_NO_CONTENT = INFO_NO_CONTENT;
    var ERROR_BAD_REQUEST = "Some error happens, Sorry, try later";
    this.ERROR_BAD_REQUEST = ERROR_BAD_REQUEST;
    var ERROR_BAD_UNAUTHORIZED = "Some error happens, Sorry, try later";
    this.ERROR_BAD_UNAUTHORIZED = ERROR_BAD_UNAUTHORIZED;
    var ERROR_NOT_FOUND = "No articles found";
    this.ERROR_NOT_FOUND = ERROR_NOT_FOUND;
    var ERROR_METHOD_NOT_ALLOWED = "Some error happens, Sorry, try later";
    this.ERROR_METHOD_NOT_ALLOWED = ERROR_METHOD_NOT_ALLOWED;
    var ERROR_CONFLICT = "This article already exist";
    this.ERROR_CONFLICT = ERROR_CONFLICT;
    var ERROR_UNPROCESSABLE_ENTITY = "The article properties are not valid";
    this.ERROR_UNPROCESSABLE_ENTITY = ERROR_UNPROCESSABLE_ENTITY;
    var ERROR_INTERNAL_ERROR = "Some error happens, Sorry, try later";
    this.ERROR_INTERNAL_ERROR = ERROR_INTERNAL_ERROR;
    
    this.INFO_DELETED = "Article deleted";
    this.INFO_UPDATED = "Article updated"
    this.ERROR_APP_BUSSY = "The application is bussy, try later";
    
    //CODE SUCESS
    this.CODE_SUCESS = 200;
    this.CODE_CREATED = 201;
    this.CODE_NO_CONTENT = 204;

    //CODE ERROR
    this.CODE_BAD_REQUEST = 400;
    this.CODE_UNAUTHORIZED = 401;
    this.CODE_NOT_FOUND = 404;
    this.CODE_METHOD_NOT_ALLOWED = 405;
    this.CODE_CONFLICT = 409;
    this.CODE_UNPROCESSABLE_ENTITY = 422;
    this.CODE_INTERNAL_ERROR = 500;
    
    this.parseCode = function(code){
        var msg = "";
        var header = "";
        if(code == 200){
            msg = INFO_SUCESS;
            header = HEADER_INFO;
        }
        if(code == 201){
            msg = INFO_CREATED;
            header = HEADER_INFO;
        }
        if(code == 204){
            msg = INFO_NO_CONTENT;
            header = HEADER_INFO;
        }
        if(code == 400){
            msg = ERROR_BAD_REQUEST;
            header = HEADER_ERROR;
        }
        if(code == 401){
            msg = ERROR_BAD_UNAUTHORIZED;
            header = HEADER_ERROR;
        }
        if(code == 404){
            msg = ERROR_NOT_FOUND;
            header = HEADER_ERROR;
        }
        if(code == 405){
            msg = ERROR_METHOD_NOT_ALLOWED;
            header = HEADER_ERROR;
        }
        if(code == 409){
            msg = ERROR_CONFLICT;
            header = HEADER_ERROR;
        }
        if(code == 422){
            msg = ERROR_UNPROCESSABLE_ENTITY;
            header = HEADER_ERROR;
        }
        if(code == 500){
            msg = ERROR_INTERNAL_ERROR;
            header = HEADER_ERROR;
        }
        return {"header":header, "msg":msg}
    }
    
    this.splitCSV = function(csvStr){
        return csvStr.split(",");
    }
}

var app = angular.module("ArticlesApp", ["ngRoute"]).config(function($routeProvider) {
    $routeProvider.when("/", {
        templateUrl: "/views/articlesList.html",
        controller: "ListCtrl"
    }).when("/articles/:idArticle", {
        templateUrl: "/views/articleEdit.html",
        controller: "EditCtrl"
    });
    console.log("App Initialized");
}).service("lockService", [LockService]).service("modalService", [ModalService]).service("propertiesService", [PropertiesService]);
