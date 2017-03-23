'use strict';
// eslint-disable-line semi
/* eslint-disable camelcase */

const Sequelize = require('sequelize');
const db = require('../_db.js');
const Issue = require('./issue.js');
const Vote = require('./vote.js');
const Cat = require('./cat.js');

const Member = db.define('members', {
  firstName: {
    type: Sequelize.STRING,
    allowNull: false,
    validate: {
      notEmpty: true
    }
  },
  middleName: {
    type: Sequelize.STRING
  },
  lastName: {
    type: Sequelize.STRING,
    allowNull: false,
    validate: {
      notEmpty: true
    }
  },
  ppid: {
    type: Sequelize.STRING,
    allowNull: false,
    unique: true,
    validate: {
      notEmpty: true
    }
  },
  party: {
    type: Sequelize.ENUM('D', 'R', 'I')
  },
  chamber: {
    type: Sequelize.ENUM('senate', 'house')
  },
  state: {
    type: Sequelize.STRING,
    allowNull: false,
    validate: {
      notEmpty: true
    }
  },
  district: {
    type: Sequelize.STRING
  },
  electionYear: {
    type: Sequelize.STRING
  }
},
{
  instanceMethods: {
    getIssueScore (issueId, startYear, endYear) {
      //called on member instance, issue id required.
      //startYear and endYear are optional,
      //and limit score calculation to bills between specified years
      if (startYear === undefined){ startYear = 2000; }
      if (endYear === undefined){ endYear = 2016; }
      const mId = this.id;
      return Issue.findById(issueId)
      .then(issue => issue.getIssue_bills({where:
        {
          year: {
            $between: [startYear, endYear]
          }
        }
      }))
      .then(bills => {
        const billArr = [];
        bills.forEach(bill => billArr.push(bill.id));
          return billArr;
        })
      .then(bIds => {
        const voteArr = [];
        bIds.forEach(bId => voteArr.push(Vote.findOne({
                  where: {
                    billId: bId,
                    memberId: mId
                  }
                })
              ));
        return voteArr;
      })
      .then(vs => Promise.all(vs))
      .then(votes => {
        let voteScore = 0;
        if (votes.length !== 0){
          votes.forEach(vote => {
            if (vote.position === 'yes') {voteScore++;}
          });
        }
        return (votes.length !== 0) ? [voteScore, votes.length] : [0, 0];
        // ((score / votes.length) * 100)
      })
      .catch(error => console.error(error));
    },
    getCatScore (catId, startYear, endYear) {
      //called on member instance, issue id required.
      //startYear and endYear are optional,
      //and limit score calculation to bills between specified years
      const member = this;
      const mId = this.id;

      return Cat.findById(catId)
      .then(cat => cat.getIssue_cats())
      .then(issues => {
        let arr = [];
        issues.forEach(issue => {
          // let inArr = [];
          // inArr.push(member.getIssueScore(issue.id, startYear, endYear));
          arr.push(issue.getIssue_cats());
          // arr.push(Promise.all(inArr));
        });
        return Promise.all(arr);
      })
      .then(result => {
        // console.log('issueId is ', result[0][0]['issue_cats']['dataValues']['issueId'], ' plusOrMinus is ', result[0][0]['issue_cats']['dataValues']['plusOrMinus']);
        // console.log('issueId is ', result[1][0]['issue_cats']['dataValues']['issueId'], ' plusOrMinus is ', result[1][0]['issue_cats']['dataValues']['plusOrMinus']);
        let scoreArr = [];
        result.forEach(issue => {
          let inArr = [];
          inArr.push(issue[0].issue_cats.dataValues.plusOrMinus);
          inArr.push(member.getIssueScore(issue[0].issue_cats.dataValues.issueId, startYear, endYear));
          scoreArr.push(Promise.all(inArr));
        });
        return Promise.all(scoreArr);
      })
      .then(scores => {
        let score = 0;
        let voteCount = 0;
        let memberScore = 0;
        for (let i = 0; i < scores.length; i++){
          if (scores[i][0] === '-'){
            // console.log(scores[i])
            score += (scores[i][1][1] - scores[i][1][0]);
            voteCount += scores[i][1][1];
          }
          else {
            // console.log(scores[i]);
            score += scores[i][1][0];
            voteCount += scores[i][1][1];
          }
        }
        memberScore = (score / voteCount) * 100;

        return [memberScore - 0, Math.abs(memberScore - 25), Math.abs(memberScore - 50), Math.abs(memberScore - 75), 100 - memberScore];

      })
      .catch(error => console.error(error));
    }
  },
  getterMethods: {
    fullName() {
      return (this.middleName)
        ? `${this.firstName} ${this.middleName} ${this.lastName}`
        : `${this.firstName} ${this.lastName}`;
    },
    chamberName() {
      return (this.chamber === 'senate')
        ? 'Senate'
        : 'House of Representatives';
    },
    partyName() {
      if (this.party === 'D') return '(D) Democrat'
      if (this.party === 'R') return '(R) Republican'
      if (this.party === 'I') return '(I) Independent'
      else return 'No party listed'
    }
  },
  hooks: {
    beforeCreate: function(member) {
      if (member.chamber === 'senate'){
        member.district = null;
      }
    }}
});

module.exports = Member;
