export interface IBaseController {
  debugMode: boolean;
}

export class BaseController implements IBaseController {
  debugMode: boolean;

  constructor() {
    /**
     * Get this value dynamicly later
     */
    this.debugMode = false;
  }
}
