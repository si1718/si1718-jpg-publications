"use strict";

class Articles{

 constructor(doi, title){
    this.idArticle = null;
    this.title = title;
    this.doi = doi;
    this.journal = "";
    this.year = 1990;
    this.authors = [];
    this.volume = 0;
    this.number = 0;
    this.initPage = 0;
    this.lastPage = 0;
    this.keywords = [];
 }
 
}

function convertJsonToObject(json, idArticle){
    var object = new Articles(json.doi, json.title);
    object.journal = json.journal;
    object.year = parseInt(json.year);
    object.authors = json.authors;
    object.volume = json.volume ? parseInt(json.volume) : null;
    object.number = json.number ? parseInt(json.number) : null;
    object.initPage = json.initPage ? parseInt(json.initPage) : null;
    object.lastPage = json.lastPage ? parseInt(json.lastPage) : null;
    object.keywords = json.keywords;
    if(idArticle != null && idArticle != undefined){
        object.idArticle = idArticle;
    } else {
        object.idArticle = sanitizeDoi(json.doi, object);
    }
    return object;
}

var REGEX_OPTIONS = "i";
var REGEX_PATTERN = ".*";

function createQueryObject(query){
    var object = {};
    if(!query){
        return null;
    }
    if(query.idArticle && query.idArticle !== ""){
        object.idArticle = {$regex: REGEX_PATTERN + query.idArticle + REGEX_PATTERN, $options: REGEX_OPTIONS };
        //object.idArticle = query.idArticle;
    }
    if(query.doi && query.doi !== ""){
        //object.doi = query.doi;
        object.doi = {$regex: REGEX_PATTERN + query.doi + REGEX_PATTERN, $options: REGEX_OPTIONS };
    }
    if(query.title && query.title !== ""){
        object.title = query.title;
        object.title = {$regex: REGEX_PATTERN + query.title + REGEX_PATTERN, $options: REGEX_OPTIONS };
    }
    if(query.journal && query.journal !== ""){
        object.journal = query.journal;
        object.journal = {$regex: REGEX_PATTERN + query.journal + REGEX_PATTERN, $options: REGEX_OPTIONS };
    }
    if(query.year && isNumber(query.year)){
        object.year = parseInt(query.year);
        //object.year = {$regex: REGEX_PATTERN + query.year + REGEX_PATTERN, $options: REGEX_OPTIONS };
    }
    if(query.volume && isNumber(query.volume)){
        object.volume = parseInt(query.volume);
        //object.volume = {$regex: REGEX_PATTERN + query.volume + REGEX_PATTERN, $options: REGEX_OPTIONS };
    }
    if(query.number && isNumber(query.number)){
        object.number = parseInt(query.number);
        //object.number = {$regex: REGEX_PATTERN + query.number + REGEX_PATTERN, $options: REGEX_OPTIONS };
    }
    if(query.initPage && isNumber(query.initPage)){
        object.initPage = parseInt(query.initPage);
        //object.initPage = {$regex: REGEX_PATTERN + query.initPage + REGEX_PATTERN, $options: REGEX_OPTIONS };
    }
    if(query.lastPage && isNumber(query.lastPage)){
        object.lastPage = parseInt(query.lastPage);
        //object.lastPage = {$regex: REGEX_PATTERN + query.lastPage + REGEX_PATTERN, $options: REGEX_OPTIONS };
    }
    /*if(query.authors instanceof Array){
        if (query.authors.length != 0){
            object.authors = query.authors;
            object.authors = {$regex: REGEX_PATTERN + query.authors + REGEX_PATTERN, $options: REGEX_OPTIONS };
        }
    }*/
    if (query.authors && query.authors !== ""){
        //object.authors = query.authors;
        object.authors = {$regex: REGEX_PATTERN + query.authors + REGEX_PATTERN, $options: REGEX_OPTIONS };
    }
    
    if(query.keywords && query.keywords !== ""){
        //object.keywords = query.keywords;
        object.keywords = {$regex: REGEX_PATTERN + query.keywords + REGEX_PATTERN, $options: REGEX_OPTIONS };
    }
    return object;
}

function validateArticle(article){
    var result = true;
    if(!article){
        return false;
    }
    if(article.doi && article.doi === ""){
        return false;
    }
    if(!article.title || article.title === ""){
        return false;
    }
    if(article.journal && article.journal === ""){
        return false;
    }
    if(article.year && !isNumber(article.year)){
        return false;
    }
    if(article.volume && !isNumber(article.volume)){
        return false;
    }
    if(article.number && !isNumber(article.number)){
        return false;
    }
    if(article.initPage && !isNumber(article.initPage)){
        return false;
    }
    if(article.lastPage && !isNumber(article.lastPage)){
        return false;
    }
    if(!(article.authors instanceof Array)){
        return false;
    } else if (article.authors.length == 0){
        return false;
    }
    if(article.keywords && !(article.keywords instanceof Array)){
        return false;
    }
    return result;
}

function isNumber (o) {
  return ! isNaN (o-0) && o !== null && o !== "" && o !== false;
}

function sanitizeDoi(doi, article) {
    var idArticle = null;
	if(doi === "") {
		return null;
	}
	if(doi !== null) {
		if(doi.includes("dx.doi.org")) {
			var finaldoi = "";
			var parts = doi.split("/");
			var found = false;
			for(var i = 0; i < parts.length; i++) {
				if(!found) {
					if(parts[i].includes("dx.doi.org")) {
						found = true;
					}
					continue;
				} else {
					finaldoi += "-" + parts[i];
				}
			}
			idArticle = finaldoi;
		} else {
			idArticle = doi.replace(/\//g, "-");
		}
	} else {
		idArticle = generateUniqueID(article);
	}
	idArticle = idArticle.toLowerCase();
	return cleanSpecialChars(idArticle);
}
	
function generateUniqueID(article) {
	var result = "";
	var nameP = article.title.split(" ");
	nameP.forEach( function(value, index, array) {
        if(value !== "") {
			result += value.charAt(0);
		}
    });
	if(article.journal !== null) {
		var journalP = article.journal.split(" ");
		journalP.forEach( function(value, index, array) {
            if(value !== "") {
		        result += value.charAt(0);
		    }
        });
	}
	if(article.year !== null) {
		result += article.year;
	}
	return result.trim().replace(/\//g, "-");
}

function cleanSpecialChars(idArticle) {
    var acceptedChars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz1234567890-";
	var result = "";
	for (var i = 0, len = idArticle.length; i < len; i++) {
	    if(acceptedChars.includes(idArticle[i])){
	        result += idArticle[i];
	    }
	}
	return result;
}

module.exports.Articles = Articles;
module.exports.convertJsonToObject = convertJsonToObject;
module.exports.validateArticle = validateArticle;
module.exports.sanitizeDoi = sanitizeDoi;
module.exports.createQueryObject = createQueryObject;