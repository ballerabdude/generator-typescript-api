/// <reference path="../typings/tsd.d.ts" />

import Hapi = require('hapi');
import Joi = require('joi');
import {ApplicationConfig, IAppConfig} from './config/application'
import Routes from './routes';
import Mongoose = require('mongoose');

interface IApi {
  config: IAppConfig;
  server: Hapi.Server;
  startApi(): void;
  initRoutes(): void;
  initDatabase(): void;
  routeManager: Routes;
}
class MyApi implements IApi {

  config: IAppConfig;
  server: Hapi.Server;

  routeManager: Routes;

  constructor() {

    this.config = new ApplicationConfig();
  }

  setupConfiguration() {
    let serverConfig = { };
    this.server = new Hapi.Server(serverConfig);
    this.server.app.name = this.config.appName;
  }

  startApi() {

    this.setupConfiguration();

    this.server.connection({port: this.config.port, host: '0.0.0.0', routes: {cors: true}});
    this.configureHapiPlugins();
    this. routeManager = new Routes(this.server)
    this.initRoutes()

    this.server.start( () =>  {
      let dashChars = '+' + new Array(32 + this.server.info.uri.length + this.server.app.name.length).join('-') + '+';
      console.log(dashChars);
      console.log('| Application `%s` is running at %s |', this.server.app.name, this.server.info.uri);
      console.log(dashChars);

    });
  }

  initRoutes() {
    this.routeManager.initRoutes();
  }

  configureHapiPlugins() {

    this.server.register(require('inert'), (err) => {
      if (err) {
        console.log('failed to register inert');
      }
    });
    this.server.register(require('vision'), (err) => {
      if (err) {
        console.log('failed to register vision');
      }
    });
    this.server.register([
      {
        register: require('hapi-swagger'),
        options: {}
      }
      ], (err) => {
        if (err) {
            this.server.log(['error'], 'hapi-swagger load error: ' + err);
        }else{
            this.server.log(['start'], 'hapi-swagger interface loaded');
        }
      }
    );
  }

  initDatabase() {
    let dbURI = 'mongodb://ds043605.mongolab.com:43605/scosac';
    let dbOptions: Mongoose.ConnectOpenOptionsBase = {user: 'scosac', pass: '8905Vn59bb2LsEnkmUX9'};
    Mongoose.connect(dbURI, dbOptions);
  }
}

var api = new MyApi();
api.initDatabase();
api.startApi();
Mongoose.connection.once('connected', function () {
});
Mongoose.connection.on('error',function (err) {
  console.log('Mongoose Connection Error: ' + err);
});
Mongoose.connection.on('disconnected', function () {
  console.log('Mongoose disconnected');
});
process.on('SIGINT', function() {
  Mongoose.connection.close(function () {
    console.log('Mongoose disconnected through app termination');
    process.exit(0);
  });
});
