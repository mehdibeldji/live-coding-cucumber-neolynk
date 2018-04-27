const Server = require('../server');
const { BeforeAll, AfterAll, Before, Given, When, Then } = require('cucumber');
const { expect } = require('chai');
const CucumberClient = require('./CucumberClient');
let server;

/**
 * Before all tests, we need to start our server
 */
BeforeAll(function(callback) {
  server = new Server();
  server.use(callback);
});

/**
 * Before each feature, we instanciate a new cucumber client
 */
Before('@api', function(scenario) {
  this.client = new CucumberClient();
});

Given(/^I set (.*) header to (.*)$/, function(headerName, headerValue) {
  this.client.setHeader(headerName, headerValue);
});

When(/^I send a GET request to "(.*)"$/, function(uri, callback) {
  this.client.get(uri, callback);
});

Then(/^The response code should be (\d+)$/, function(code) {
  expect(code).equal(this.client.statusCode);
});

Then(/^The response should contain "(.*)"$/, function(content) {
  expect(JSON.stringify(this.client.httpResponse.body)).contain(content)
});

/**
 * After all tests, we need to close our server
 */
AfterAll(function() {
  server.close();
});