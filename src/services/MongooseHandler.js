import Mongoose from "mongoose";

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
      let dbConnect;
      if(ENV === 'production') {
        dbConnect = `mongodb://${ DB_USER }:${ DB_PASSWORD }@${ DB_HOST }:${ DB_PORT }/${ DB_NAME }`
      } else {
        dbConnect = `mongodb://${ DB_HOST }:${ DB_PORT }/${ DB_NAME }`
      }
      this.mongoose.connect(
        dbConnect,
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
}
