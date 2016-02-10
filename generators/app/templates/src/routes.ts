/// <reference path="../typings/tsd.d.ts" />

import Hapi = require('hapi');


export interface IBaseRoute {
  initRoute(): void;
  server: Hapi.Server;
  routes: Hapi.IRouteConfiguration[];
}
/**
 * Base class of any route class
 * This class will have the job of initalizing our routes
 *
 */
export class BaseRoute implements IBaseRoute {

  server: Hapi.Server;
  /**
   * An array of routes configurations
   * https://github.com/DefinitelyTyped/DefinitelyTyped/blob/master/hapi/hapi.d.ts#L822
  */
  routes: Hapi.IRouteConfiguration[]; //

  constructor(server: Hapi.Server, routes: Hapi.IRouteConfiguration[]) {
    this.server = server;
    this.routes = routes;
  }

  initRoute() {
    // add each route to the server
    for (let index in this.routes) {
      this.server.route(this.routes[index]);
    }
  }

}

// IBaseRoute and BaseRoute needs to be exported before importing any routes
import NameRoute from './routes/nameRoute';




interface IRoutes {
  server: Hapi.Server;

}

export default class Routes implements IRoutes {

  server: Hapi.Server;

  constructor(server: Hapi.Server) {
    this.server = server;
    return this;
  }

  /**
   * init each route module
   */
  initRoutes() {
    var nameRoute = new NameRoute(this.server);
  }

}


