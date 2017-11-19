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
    object.idArticle = sanitizeDoi(json.doi, object);
    return object;
}

function validateArticle(article){
    var result = true;
    if(!article){
        return false;
    }
    if(!article.doi || article.doi == ""){
        //return false;
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
	return idArticle;
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

module.exports.Articles = Articles;
module.exports.convertJsonToObject = convertJsonToObject;
module.exports.validateArticle = validateArticle;
module.exports.sanitizeDoi = sanitizeDoi;