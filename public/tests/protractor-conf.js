exports.config = {
    seleniumAddress: 'http://localhost:9515',
    specs: ['T01-List.js'],
    capabilities: {'browserName':'phantomjs'}
}