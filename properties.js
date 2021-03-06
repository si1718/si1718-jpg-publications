"use strict";

var URL_BASE = "/api/v1/";
var BBDD_URL = process.env.BD_URL;
var RESSOURCE_NAME = "articles";
var REPORTS_NAME = "reports";
var KEYWORDS_NAME = "keywords";
var NEWARTICLES_NAME = "newArticles";
var ARTICLESGRAPH_NAME = "articlesGraph";
var RECOMMENDATIONS_NAME = "recommendations";

//CODE SUCESS
var CODE_SUCESS = 200;
var CODE_CREATED = 201;
var CODE_NO_CONTENT = 204;

//CODE ERROR
var CODE_BAD_REQUEST = 400;
var CODE_UNAUTHORIZED = 401;
var CODE_NOT_FOUND = 404;
var CODE_METHOD_NOT_ALLOWED = 405;
var CODE_CONFLICT = 409;
var CODE_UNPROCESSABLE_ENTITY = 422;
var CODE_INTERNAL_ERROR = 500;


module.exports = {
   URL_BASE: function(){
       return URL_BASE;
   },
   BBDD_URL: function(){
       return BBDD_URL;
   },
   RESSOURCE_NAME: function(){
       return RESSOURCE_NAME;
   },
   REPORTS_NAME: function(){
       return REPORTS_NAME;
   },
   KEYWORDS_NAME: function(){
       return KEYWORDS_NAME;
   },
   NEWARTICLES_NAME: function(){
       return NEWARTICLES_NAME;
   },
   ARTICLESGRAPH_NAME: function(){
       return ARTICLESGRAPH_NAME;
   },
   RECOMMENDATIONS_NAME: function(){
       return RECOMMENDATIONS_NAME;
   },
   CODE_SUCESS:CODE_SUCESS,
   CODE_CREATED:CODE_CREATED,
   CODE_NO_CONTENT: CODE_NO_CONTENT,
   CODE_BAD_REQUEST:CODE_BAD_REQUEST,
   CODE_UNAUTHORIZED:CODE_UNAUTHORIZED,
   CODE_NOT_FOUND:CODE_NOT_FOUND,
   CODE_METHOD_NOT_ALLOWED:CODE_METHOD_NOT_ALLOWED,
   CODE_CONFLICT:CODE_CONFLICT,
   CODE_UNPROCESSABLE_ENTITY:CODE_UNPROCESSABLE_ENTITY,
   CODE_INTERNAL_ERROR:CODE_INTERNAL_ERROR
}