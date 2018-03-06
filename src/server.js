import path from 'path';
import express from 'express';
import methodOverride from 'method-override';
import bodyParser from 'body-parser';

import Routes from './routes/routes'
import MethodOverrideService from './services/MethodOverrideService'

import { PORT } from './config'

export default class Server {
  constructor() {
    // init app server
    this._app = express();

    // set public directory where to put client css an js files
    this._app.use(express.static(path.join(__dirname, '/../public')));

    // parse requests
    this._app.use(bodyParser.json());
    this._app.use(bodyParser.urlencoded({extended: true}));

    // override http method to be able to use 'put' and 'delete' methods in html forms
    const mos = new MethodOverrideService();
    this._app.use(methodOverride((req, res) => mos.override(req, res)));

    // set twig engine for templating and set views directory
    this._app.set('view engine', 'twig');
    this._app.set('views', path.join(__dirname, '../src/views/'));

    // set app port
    this.port = PORT || 3000;

    // init routes
    new Routes(this._app);
  }

  run() {
    this._app.listen(this.port, () => console.log(`Server available at http://localhost:${this.port}!`));
  }
}