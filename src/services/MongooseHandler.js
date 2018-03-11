import Mongoose from "mongoose"
import _ from 'lodash'

import { ENV, DEBUG, DB_HOST, DB_PORT, DB_USER, DB_PASSWORD, DB_NAME } from "config"

export default class mongooseHandler {
  constructor() {
    this.mongoose = Mongoose;
    if(DEBUG === 'true') {
      this.mongoose.set('debug', true)
    }
  }

  connect() {
    return new Promise((resolve, reject) => {
      Mongoose.Promise = global.Promise;
      let dbCredentials = '';
      if(!_.isEmpty(DB_USER)) {
        dbCredentials = DB_USER + ':' + DB_PASSWORD + '@'
      }
      this.mongoose.connect(
        `mongodb://${dbCredentials}${ DB_HOST }:${ DB_PORT }/${ DB_NAME }`,
        {
          keepAlive: true,
          reconnectTries: Number.MAX_VALUE,
          useMongoClient: true
        },
        err => {
          if(err)
            reject(err);
          else
            resolve("Connected to MongoDB");
        }
      );
    });
  }

  disconnect() {
    this.mongoose.connection.close()
  }
}
