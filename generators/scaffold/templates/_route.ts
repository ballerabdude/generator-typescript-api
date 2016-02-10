/// <reference path="../../typings/tsd.d.ts" />

import Hapi = require('hapi');
import {BaseRoute, IBaseRoute} from '../routes'
import <%= scaffoldName.capital  %>Controller from './../controllers/<%= scaffoldName.lower  %>Controller'

export default class <%= scaffoldName.capital  %>Route extends BaseRoute implements IBaseRoute {
  routes: Hapi.IRouteConfiguration[];

  constructor(server: Hapi.Server) {
    var <%= scaffoldName.lower  %>Controller = new <%= scaffoldName.capital  %>Controller();
    this.routes = [
      {
        method: 'GET',
        path: '/<%= scaffoldName.lower  %>',
        handler: <%= scaffoldName.lower  %>Controller.getName(<%= scaffoldName.lower  %>Controller),
        config: {
          description: 'Get todo',
          notes: 'An exmple description',
          tags: ['api']
        }
      }
    ];
    super(server, this.routes)
    super.initRoute();
  }
}
