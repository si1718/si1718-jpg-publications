var fs = require('fs');

function writeScreenShot(data, filename) {
        var stream = fs.createWriteStream(filename);
        stream.write(new Buffer(data, 'base64'));
        stream.end();
}

describe('Search article', function () {
	it('Should show an article', function (){
		browser.get('http://localhost:8080');
		browser.driver.sleep(2000);
		
		element(by.buttonText('Advanced Search')).click();
		browser.driver.sleep(500);
		element(by.model('articleToSearch.title')).sendKeys('Protractor Test');
		element(by.model('articleToSearch.journal')).sendKeys('Protractor Journal');
		element(by.buttonText('Search')).click().then(function (){
		    browser.driver.sleep(2000);
		    element.all(by.repeater('article in articles track by article.idArticle')).then(function (articles){
			    expect(articles.length).toBeGreaterThan(0);
			    browser.takeScreenshot().then(function (png) {
    			    writeScreenShot(png, 'test02.png');
    	        });
			});
		});
	});
});