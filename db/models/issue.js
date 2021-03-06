'use strict';
// eslint-disable-line semi
/* eslint-disable camelcase */

const Sequelize = require('sequelize');
const db = require('../_db.js');

const Issue = db.define('issues', {
  catCode: {
    type: Sequelize.STRING,
    allowNull: false,
    validate: {
      notEmpty: true
    }
    // 'catCode' taken from http://www.opensecrets.org/downloads/crp/CRP_Categories.txt
  },
  name: {
    type: Sequelize.STRING,
    allowNull: false,
    validate: {
      notEmpty: true
    }
    // 'name' is the common English name of category. Comes in through the 'Catname' key. Ex: "Anti-Guns", "Labor, anti-union"
    // also taken from http://www.opensecrets.org/downloads/crp/CRP_Categories.txt
  }
},
{
  getterMethods: {

  }
});

module.exports = Issue;
