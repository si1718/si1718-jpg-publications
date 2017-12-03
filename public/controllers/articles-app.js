function LockService() {
    var lock = false;

    this.checkLock = function () {
        return lock;
    };

    this.releaseLock = function () {
        lock = false;
    };

    this.blockLock = function () {
        lock = true;
    };
}

function ModalService(){
    var MODAL_NAME = "#systemModal";
    var MODAL_HEADER = "#systemModalHeader";
    var MODAL_TEXT = "#systemModalText";
    
    this.showFrom = function (args){
        $(MODAL_HEADER).text(args["header"]);
        $(MODAL_TEXT).text(args["msg"]);
        //Change color
        $(MODAL_NAME).modal("show");
    };
    
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
    var DEFAULT_API_URI = "/api/v1/articles/";
    this.DEFAULT_API_URI = DEFAULT_API_URI;
    var DEFAULT_JOURNAL_URI = "https://si1718-amo-journals.herokuapp.com/api/v1/journals/";
    this.DEFAULT_JOURNAL_URI = DEFAULT_JOURNAL_URI;
    var DEFAULT_AUTHOR_URI = "https://si1718-dfr-researchers.herokuapp.com/api/v1/researchers/";
    this.DEFAULT_AUTHOR_URI = DEFAULT_AUTHOR_URI;
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
    
    var ERROR_JOURNAL_NOT_FOUND = "Journal not found";
    this.ERROR_JOURNAL_NOT_FOUND = ERROR_JOURNAL_NOT_FOUND;
    var ERROR_JOURNAL_CANNOT_VALIDATE = "Cannot validate Journal";
    this.ERROR_JOURNAL_CANNOT_VALIDATE = ERROR_JOURNAL_CANNOT_VALIDATE;
    var ERROR_JOURNAL_ERROR = "Cannot validate Journal, try later";
    this.ERROR_JOURNAL_ERROR = ERROR_JOURNAL_ERROR;
    var ERROR_JOURNAL_ERROR_EMPTY = "The journal field is empty!";
    this.ERROR_JOURNAL_ERROR_EMPTY = ERROR_JOURNAL_ERROR_EMPTY;
    
    var INFO_JOURNAL_VALID = "Journal valid";
    this.INFO_JOURNAL_VALID = INFO_JOURNAL_VALID;
    
    var ERROR_AUTHOR_NOT_FOUND = "Author not found";
    this.ERROR_AUTHOR_NOT_FOUND = ERROR_AUTHOR_NOT_FOUND;
    var ERROR_AUTHOR_CANNOT_VALIDATE = "Cannot validate Author";
    this.ERROR_AUTHOR_CANNOT_VALIDATE = ERROR_AUTHOR_CANNOT_VALIDATE;
    var ERROR_AUTHOR_ERROR = "Cannot validate Author, try later";
    this.ERROR_AUTHOR_ERROR = ERROR_AUTHOR_ERROR;
    var ERROR_AUTHOR_ERROR_EMPTY = "The author field is empty!";
    this.ERROR_AUTHOR_ERROR_EMPTY = ERROR_AUTHOR_ERROR_EMPTY;
    
    var INFO_AUTHOR_VALID = "Author valid";
    this.INFO_AUTHOR_VALID = INFO_AUTHOR_VALID;
    
    var ERROR_CHART_CANNOT_LOAD = "Cannot load chart";
    this.ERROR_CHART_CANNOT_LOAD = ERROR_CHART_CANNOT_LOAD;
    
    this.INFO_DELETED = "Article deleted";
    this.INFO_UPDATED = "Article updated";
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
        return {"header":header, "msg":msg};
    };
    
    this.splitCSV = function(csvStr){
        return csvStr.split(",");
    };
}

angular.module("ArticlesApp", ["ngRoute"]).config(function($routeProvider) {
    $routeProvider.when("/", {
        templateUrl: "/views/articlesList.html",
        controller: "ListCtrl"
    }).when("/articles/:idArticle", {
        templateUrl: "/views/articleEdit.html",
        controller: "EditCtrl"
    }).when("/chart/", {
        templateUrl: "/views/chart.html",
        controller: "ChartCtrl"
    });
    console.log("App Initialized");
}).service("lockService", [LockService]).service("modalService", [ModalService]).service("propertiesService", [PropertiesService]);
