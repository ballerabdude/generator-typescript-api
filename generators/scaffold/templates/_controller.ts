/// <reference path="../../typings/tsd.d.ts" />

import Hapi = require('hapi');
import {BaseController} from './BaseController';

interface I<%= scaffoldName.capital  %>Controller {
  getName(mainContext: <%= scaffoldName.capital  %>Controller): void;
}

export default class <%= scaffoldName.capital  %>Controller extends BaseController implements I<%= scaffoldName.capital  %>Controller {

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
