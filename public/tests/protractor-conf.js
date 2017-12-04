exports.config = {
    directConnect: true,
    baseUrl: 'http://localhost:8080/',
    specs: ['T01-List.js', 'T02-Search.js'],
    capabilities: {
    'browserName': 'chrome',
    chromeOptions: {
      args: [ "--headless", "--disable-gpu", "--window-size=1920x1080" ]
    }
  }
}