/// <reference path="../../typings/hapi/hapi.d.ts" />

import Hapi = require('hapi');
import {BaseRoute, IBaseRoute} from '../routes'
import NameController from './../controllers/nameController'

export default class NameRoute extends BaseRoute implements IBaseRoute {
  routes: Hapi.IRouteConfiguration[];

  constructor(server: Hapi.Server) {
    var nameController = new NameController();
    this.routes = [
      {
        method: 'GET',
        path: '/',
        handler: nameController.getName(nameController),
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
