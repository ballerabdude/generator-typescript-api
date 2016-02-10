'use strict';
var yeoman = require('yeoman-generator'),
    mkdirp = require('mkdirp'),
    yosay  = require('yosay'),
    slugify = require('slugg'),
    chalk = require('chalk');

module.exports = yeoman.generators.Base.extend({
  _createProjectFileSystem: function () {
    var destRoot = this.destinationRoot(),
        sourceRoot = this.sourceRoot(),
        templateContext = {
          appName: this.appname
        };

    mkdirp(destRoot + '/src');

    this.directory(sourceRoot + '/src', destRoot + '/src');
    this.template(sourceRoot + '/_tsd.json', destRoot + '/tsd.json', templateContext);
    this.template(sourceRoot + '/_tsconfig.json', destRoot + '/tsconfig.json');
    this.template(sourceRoot + '/_.gitignore', destRoot + '/.gitignore');
    this.template(sourceRoot + '/_package.json', destRoot + '/package.json', templateContext);
    this.template(sourceRoot + '/_gulpfile.js', destRoot + '/gulpfile.js', templateContext);
    this.template(sourceRoot + '/_README.md', destRoot + '/README.md', templateContext);
    this.template(sourceRoot + '/Dockerfile', destRoot + '/Dockerfile', templateContext);
    this.template(sourceRoot + '/ecs_cf.json', destRoot + '/ecs_ecs.json', templateContext);
    this.template(sourceRoot + '/ecs_task.json', destRoot + '/ecs_task.json', templateContext);

  },
  prompting: function () {
    var done = this.async();

    // Have Yeoman greet the user.
    this.log(yosay(
      'Welcome to the delightful ' + chalk.red('generator-typescript-api') + ' generator!'
    ));

    var prompts = [
      {
        name: 'name',
        message: 'What is the name of your project?',
        default: slugify(this.appname)
      }
    ];

    this.prompt(prompts, function (answers) {
      this._saveAnswers(answers, done);
    }.bind(this));
  },
  _saveAnswers: function (answers, callback) {
    this.appname = answers.name;
    callback();
  },

  writing: function () {
    this._createProjectFileSystem();
  },

  install: function () {
    var self = this;
    self.installDependencies({
      callback: function () {
        self.npmInstall(['tsd', 'gulp'], '-g', function() {
          self.spawnCommand('tsd', ['install']).on('close', function () {
          });
        });
      }
    });
  },

  end: function () {
    var self = this;
    self.spawnCommand('git', ['init']).on('close', function () {
      self.spawnCommand('git', ['add', '--all']).on('close', function () {
        self.spawnCommand('git', ['commit', '-m', '"initial commit from generator"']);
      });
    });

  }
});
