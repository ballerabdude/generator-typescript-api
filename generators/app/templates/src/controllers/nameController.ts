/// <reference path="../../typings/hapi/hapi.d.ts" />

import Hapi = require('hapi');
import {BaseController} from './BaseController';

interface INameController {
  getName(mainContext: NameController): void;
}

export default class NameController extends BaseController implements INameController {

  constructor() {
    super();
  }
  getName(mainContext) {
    // make the mainContext available in the handler function
    var self = mainContext;

    // handler function for Hapi
    return (request: Hapi.Request, reply: Hapi.IReply) => {

      //debugMode does nothing now. Used as an example
      reply('Brought to you by: Baller Abdude. Is this debug mode? ' + self.debugMode);
    }
  }
}
