'use strict';

var generators = require('yeoman-generator'),
    mkdirp    = require('mkdirp'),
    yosay = require('yosay'),
    slugify = require('slugg'),
    chalk = require('chalk'),
    _ = require('lodash');

module.exports = generators.Base.extend({
  _createProjectFileSystem: function () {
    var destRoot = this.destinationRoot(),
        sourceRoot = this.sourceRoot(),
        templateContext = {
          scaffoldName: {
            capital: this.scaffoldName.charAt(0).toUpperCase() + this.scaffoldName.slice(1),
            lower: this.scaffoldName.charAt(0).toLowerCase() + this.scaffoldName.slice(1)
          },
        };


    this.template(sourceRoot + '/_controller.ts', destRoot + '/src/controllers/'+ templateContext.scaffoldName.lower +'Controller.ts', templateContext);
    if (!this.skipModel) {
      this.template(sourceRoot + '/_model.ts', destRoot + '/src/models/'+ templateContext.scaffoldName.lower +'Model.ts', templateContext);
    }
    if (!this.skipRoute) {
      this.template(sourceRoot + '/_route.ts', destRoot + '/src/routes/'+ templateContext.scaffoldName.lower +'Route.ts', templateContext);
    }

  },

  constructor: function () {
    generators.Base.apply(this, arguments);
    this.argument('appname', { type: String, required: true });
    this.scaffoldName = _.camelCase(this.appname);

    this.option('skip-model');
    this.skipModel = this.options['skip-model'];

    this.option('skip-route');
    this.skipModel = this.options['skip-route'];
  },

  configuring: function () {
    this.config.save();
  },

  writing: function () {
    this._createProjectFileSystem();
  },

});
