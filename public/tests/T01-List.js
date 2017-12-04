var fs = require('fs');

function writeScreenShot(data, filename) {
        var stream = fs.createWriteStream(filename);
        stream.write(new Buffer(data, 'base64'));
        stream.end();
}

describe('List',function  (){
   it('Should show a list of more than two articles', function (){
       browser.get("http://localhost:8080/");
       var articles = element.all(by.repeater('article in articles track by article.idArticle'));
       browser.driver.sleep(2000);
       
       browser.takeScreenshot().then(function (png) {
    			writeScreenShot(png, 'test01.png');
    	});
    	
       expect(articles.count()).toBeGreaterThan(2);
   });
});