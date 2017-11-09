var expressJS = require("express");
var bodyParserJS = require("body-parser");
var mongodbJS = require("mongodb");
var propertiesJS = require("./properties");
var articlesJS = require("./articles");

var app = expressJS();
var mongoClient = mongodbJS.MongoClient;
var articlesCollection = undefined;



mongoClient.connect(propertiesJS.BBDD_URL(), { native_parser: true }, function(err, database) {
    if (err) {
        console.log("Cannot connect to MongoBD err: " + err);
        process.abort();
    }
    else {
        articlesCollection = database.collection(propertiesJS.RESSOURCE_NAME());

        //Start the app
        app.listen(process.env.PORT);
    }
});

app.use(bodyParserJS.json());

//Create main retrievers
app.get(propertiesJS.URL_BASE() + propertiesJS.RESSOURCE_NAME(), function(req, res) {
    articlesCollection.find({}).toArray(function(error, articles) {
        if (error) {
            res.sendStatus(propertiesJS.CODE_INTERNAL_ERROR);
        }
        else {
            res.send(articles);
        }
    });
});

app.post(propertiesJS.URL_BASE() + propertiesJS.RESSOURCE_NAME(), function(req, res) {
    var newResource = req.body;
    if (!newResource) {
        res.sendStatus(propertiesJS.CODE_BAD_REQUEST);
    }
    else {
        if (articlesJS.validateArticle(newResource)) {
            var article = articlesJS.convertJsonToObject(req.body);
            // Check if exist
            var query = { articleId: article.articleId };
            articlesCollection.findOne(query, function(error, found) {
                if (error) {
                    res.sendStatus(propertiesJS.CODE_INTERNAL_ERROR);
                }
                else {
                    if (found) {
                        res.sendStatus(propertiesJS.CODE_CONFLICT);
                    }
                    else {
                        articlesCollection.insertOne(article, function(error, response) {
                            if (error) {
                                res.sendStatus(propertiesJS.CODE_INTERNAL_ERROR);
                            }
                            else {
                                res.send();
                            }
                        });
                    }
                }
            });
        }
        else {
            res.sendStatus(propertiesJS.CODE_BAD_REQUEST);
        }
    }
});

app.delete(propertiesJS.URL_BASE() + propertiesJS.RESSOURCE_NAME(), function(req, res) {
    articlesCollection.remove({}, function(error, rows) {
        if (error) {
            res.sendStatus(propertiesJS.CODE_INTERNAL_ERROR);
        }
        else {
            if (rows > 0) {
                console.log("Delete Database");
                res.sendStatus(propertiesJS.CODE_NO_CONTENT);
            }
            else {
                console.log("Database is already empty");
                res.sendStatus(propertiesJS.CODE_NOT_FOUND);
            }
        }
    });
});

//Create resources retrievers
app.get(propertiesJS.URL_BASE() + propertiesJS.RESSOURCE_NAME() + "/:articleId", function(req, res) {
    var articleId = req.params.articleId;
    if (!articleId) {
        res.sendStatus(propertiesJS.CODE_BAD_REQUEST);
    }
    else {
        var query = { articleId: articlesJS.sanitizeDoi(req.params.articleId) }
        articlesCollection.find(query).toArray(function(error, articles) {
            if (!articleId) {
                res.sendStatus(propertiesJS.CODE_INTERNAL_ERROR);
            }
            else {
                if (articles.length > 0) {
                    res.send(articles);
                }
                else {
                    res.sendStatus(propertiesJS.CODE_NOT_FOUND);
                }
            }
        });
    }
});

app.put(propertiesJS.URL_BASE() + propertiesJS.RESSOURCE_NAME() + "/:articleId", function(req, res) {
    var articleId = req.params.articleId;
    var newResource = req.body;
    if (!newResource || !articleId) {
        res.sendStatus(propertiesJS.CODE_BAD_REQUEST);
    }
    else {
        if (articlesJS.validateArticle(newResource)) {
            var article = articlesJS.convertJsonToObject(req.body);
            // Check if exist
            var query = { articleId: articlesJS.sanitizeDoi(articleId)};
            articlesCollection.findOne(query, function(error, found) {
                if (error) {
                    res.sendStatus(propertiesJS.CODE_INTERNAL_ERROR);
                }
                else {
                    if (!found) {
                        res.sendStatus(propertiesJS.CODE_NOT_FOUND);
                    }
                    else {
                        articlesCollection.updateOne(query, article, function(error, response) {
                            if (error) {
                                res.sendStatus(propertiesJS.CODE_INTERNAL_ERROR);
                            }
                            else {
                                res.send();
                            }
                        });
                    }
                }
            });
        }
        else {
            res.sendStatus(propertiesJS.CODE_BAD_REQUEST);
        }
    }
});

app.delete(propertiesJS.URL_BASE() + propertiesJS.RESSOURCE_NAME() + "/:articleId", function(req, res) {
    var articleId = req.params.articleId;
    if (!articleId) {
        res.sendStatus(propertiesJS.CODE_BAD_REQUEST);
    }
    else {
        var query = { articleId: articlesJS.sanitizeDoi(req.params.articleId) }
        articlesCollection.deleteOne(query, function(error, rows) {
            if (error) {
                res.sendStatus(propertiesJS.CODE_INTERNAL_ERROR);
            }
            else {
                if (rows > 0) {
                    console.log("Delete resource: " + articleId);
                    res.sendStatus(propertiesJS.CODE_NO_CONTENT);
                }
                else {
                    res.sendStatus(propertiesJS.CODE_NOT_FOUND);
                }
            }
        });
    }
});
