/// <reference path="../../typings/tsd.d.ts" />

import Mongoose = require('mongoose');
import Promise = require('bluebird');

interface I<%= scaffoldName.capital  %> extends Mongoose.Document {
  created: Date;
  updated: Date;
}


export interface I<%= scaffoldName.capital  %>Raw {
}

/**
 * MongooseSchema
 * @type {"mongoose".Schema}
 * @private
 */
var _schema: Mongoose.Schema = new Mongoose.Schema({
    created: {
      type: Date,
      default: Date.now
    },
    updated: {
      type: Date,
      default: Date.now
    }
  })
  .pre('save', function(next) {
    this.updated = new Date();
    next();
  });


/**
 * Mongoose.Model
 * @type {Model<I<%= scaffoldName.capital  %>>}
 * @private
 */
var _model = Mongoose.model < I<%= scaffoldName.capital  %> > ('<%= scaffoldName.capital  %>', _schema);


export class <%= scaffoldName.capital  %> {


  /**
   * static
   * @param id
   * @returns {Promise<<%= scaffoldName.capital  %>>}
   */
  static findById(id: string): Mongoose.Promise < I<%= scaffoldName.capital  %> > {
    return _model.findById(new Mongoose.Types.ObjectId(id).toString()).exec();
  }


  static create(<%= scaffoldName.lower  %>: I<%= scaffoldName.capital  %>Raw): Mongoose.Promise < I<%= scaffoldName.capital  %> > {
    return _model.create(<%= scaffoldName.lower  %>);
  }

  public static model = _model;

  private _document: I<%= scaffoldName.capital  %>;

  /**
   * コンストラクタ
   * @param mongoose.Document<I<%= scaffoldName.capital  %>>
   */
  constructor(document: I<%= scaffoldName.capital  %>) {

    this._document = document;

  }


}
