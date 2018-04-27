const axios = require('axios');
const SERVER_URL = 'http://localhost:3000';

/**
 * A HTTP client for send request to the node server
 * @class
 */
module.exports = class CucumberClient {
  /**
   * @constructor
   */
  constructor() {
    this.statusCode;
    this.httpResponse = {};
    this.headers = {
      'Content-Type': 'application/json',
      'user-agent': 'neolynk-demo-cucumber'
    };
  }

  /**
   * Set request's header
   * @param {string} name - the header's name
   * @param {string} value - the header's value
   */
  setHeader(name, value) {
    this.headers[name.toLowerCase()] = value.toLowerCase();
  }

  /**
   * Send a GET request
   * @param {string} uri - the URI
   * @param {callback} callback - the callback for Cucumber
   * @returns {callback}
   */
  async get(uri, callback) {
    try {
      const res = await axios.get(SERVER_URL + uri, {headers: this.headers});
      this.httpResponse.body = res.data;
      this.statusCode = res.status;
      return callback();
    } catch (httpErr)  {
      this.httpResponse.body = httpErr.response.data;
      this.statusCode = httpErr.response.status;
      return callback();
    }
  }
}