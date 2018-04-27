const express = require('express');

/**
 * Create an express server
 * @class
 */
module.exports = class Server {
  /**
   * @constructor
   */
  constructor() {
    this.server = null;
    this.serverListener = null;
  }

  /**
   * Start an express node server
   * @param {callback} callback - callback function for know when server is ready
   */
  use(callback) {
    this.server = express();

    this.server.get('/', (req, res) => {
      return res.send({data: 'toto'});
    });

    this.serverListener = this.server.listen(3000, () => {
      console.log('NodeJS Server is running\n');
      callback();
    });
  }

  /**
   * Close the express server
   */
  close() {
    this.serverListener.close();
    console.log('\nNodeJS Server is shutting down ...');
  }
};

