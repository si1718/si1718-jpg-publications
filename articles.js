"use strict";

class Articles{

 constructor(doi, title){
    this.articleId = sanitizeDoi(doi); 
    this.title = title;
    this.doi = doi;
    this.journal = "";
    this.year = 1990;
    this.authors = [];
    this.volume = 0;
    this.number = 0;
    this.initPage = 0;
    this.lastPage = 0;
 }
 
}

function convertJsonToObject(json){
    var object = new Articles(json.doi, json.title);
    object.journal = json.journal;
    object.year = json.year;
    object.authors = json.authors;
    object.volume = json.volume;
    object.number = json.volume;
    object.initPage = json.initPage;
    object.lastPage = json.lastPage;
    return object;
}

function validateArticle(article){
    var result = true;
    if(!article){
        return false;
    }
    if(!article.doi || article.doi == ""){
        return false;
    }
    if(!article.title || article.title == ""){
        return false;
    }
    if(!article.journal || article.journal == ""){
        return false;
    }
    if(!article.year || !isNumber(article.year)){
        return false;
    }
    if(!article.volume || !isNumber(article.volume)){
        return false;
    }
    if(!article.number || !isNumber(article.number)){
        return false;
    }
    if(!article.initPage || !isNumber(article.initPage)){
        return false;
    }
    if(!article.lastPage || !isNumber(article.lastPage)){
        return false;
    }
    if(!(article.authors instanceof Array)){
        return false;
    }
    return result;
}

function isNumber (o) {
  return ! isNaN (o-0) && o !== null && o !== "" && o !== false;
}

function sanitizeDoi(doi){
    return doi.replace(/\//g, "-");
}

module.exports.Articles = Articles;
module.exports.convertJsonToObject = convertJsonToObject;
module.exports.validateArticle = validateArticle;
module.exports.sanitizeDoi = sanitizeDoi;