/// <reference path="../../typings/node/node.d.ts" />

export interface IAppConfig {
  appName: string;
  version: string;
  port: number;
  secret: string;
}

class ApplicationEnv {
  port: number;
  secret: string;

  constructor() {
    this.port = process.env.API_PORT || 8000;
    this.secret = process.env.API_SECERT || 'secert';
  }
}
export class ApplicationConfig extends ApplicationEnv implements IAppConfig {
  appName: string;
  version: string;
  constructor() {
    super();
    this.appName = 'My Api';
  }
}
