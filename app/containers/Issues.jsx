import React, { Component } from 'react';
import { connect } from 'react-redux';
import { DropDownMenu, MenuItem, FloatingActionButton } from 'material-ui';
import ContentAdd from 'material-ui/svg-icons/content/add';
import { FaMinusCircle } from 'react-icons/lib/fa';

import Issue from '../components/Issue.jsx';
import {modifyIncludedIssue, modifyScoreAndWeight, addIssue, issueChange, scoreChange, deleteIssue, stateChange, hideState, scorePoliticiansChange} from '../ducks/issues'

const styles = {
  delete: {
    marginTop: 20,
    color: 'red',
    display: 'inline-block',
  },
  dropdown: {
    display: 'inline-block',
    float: 'left',
    width: '80%'
  },
}

class Issues extends Component {
  constructor(props) {
    super(props);
    this.state = {
      issueValues: {},
      IssueNumber: 0
    }
    this.handleChange = this.handleChange.bind(this);
    this.handleIssueChange = this.handleIssueChange.bind(this);
    this.handleAddIssue =  this.handleAddIssue.bind(this);
    this.renderIssues =  this.renderIssues.bind(this);
    this.handleDeleteIssue = this.handleDeleteIssue.bind(this);
  }

// ADD_ISSUE - adds standard dropdown
  handleAddIssue() {
    this.props.addIssue()
  }

// ISSUE_CHANGE - changes menuitem issue
  handleIssueChange(index, value) {
    this.props.issueChange(index, value)
    this.props.modifyIssue(value, index)
  }

// SCORE_CHANGE
  handleChange(index, value) {
    this.props.scoreChange(index, value)
    const itemValue = this.props.issues.issueValues[index].value
    this.props.changeScore(itemValue, value)
  }

// DELETE_ISSUE
  handleDeleteIssue(index, value) {
    this.props.removeIssue(value, index);
  }

  renderIssues() {
  const {issues, issueValues, issueNumber} = this.props.issues;
  let issuesList = [];

  for (let i = 1; i <= issueNumber; i++) {
    issuesList.push(
        <div key={i}>
         <DropDownMenu
           value={issueValues[i].value}
           autoWidth={true}
           onChange={(event, index, value) => this.handleIssueChange(i, value)}
           maxHeight={300}
           labelStyle={{color: 'black', fontWeight: 'bold'}}
           style={styles.dropdown}
         >
           <MenuItem
             value={1}
             primaryText="Select Issue"
             disabled={true}
           />
          {
            Object.keys(issues).sort().map((issue) => {
              return (
                (issues[issue].included)
                ? <MenuItem
                  value={issues[issue].id}
                  key={issues[issue].id}
                  primaryText={issue}
                  disabled
                />
                : <MenuItem
                  value={issues[issue].id}
                  key={issues[issue].id}
                  primaryText={issue}
                />
              )
            })
          }

         </DropDownMenu>

         <FaMinusCircle
            style={styles.delete}
            value={issueValues[i].value}
            onClick={() => {this.handleDeleteIssue(i, issueValues[i].value)}}
          />

         <Issue
           value={issueValues[i].slidebar}
           handleChange={(evt, newValue) => this.handleChange(i, newValue)}
         />
       </div>
     )
    }
  return issuesList;
  }

  render() {
    const {issues, issueValues, issueNumber} = this.props.issues;

    return (
      <div style={styles.block}>
        <FloatingActionButton
          mini={true}
          secondary={true}
          onClick={this.handleAddIssue}
        >
          <ContentAdd />
        </FloatingActionButton>
        <div>
          { this.renderIssues() }
        </div>
      </div>
    )
  }
}

/* REDUX CONTAINER */
const mapStateToProps = ({issues, issueValues, issueNumber, states, selectedState, displayState}) => {
  return {
    issues,
    issueValues,
    issueNumber,
    states,
    selectedState,
    displayState
  }
}

const mapDispatchToProps = (dispatch) => ({
  addIssue(){
    dispatch(addIssue())
  },
  issueChange(index, value){
    dispatch(issueChange(index, value))
  },
  modifyIssue(issueId, linkId){
    dispatch(modifyIncludedIssue(issueId, linkId))
    dispatch(scorePoliticiansChange())
  },
  scoreChange(index, value){
    dispatch(scoreChange(index, value))
  },
  removeIssue(issueId, linkId) {
    dispatch(deleteIssue(issueId, linkId))
  },
  stateChange(state) {
    dispatch(stateChange(state))
    dispatch(scorePoliticiansChange())
  },
  hideState(){
    dispatch(hideState())
  },
  changeScore(itemValue, value) {
    dispatch(modifyScoreAndWeight(itemValue, value))
  }
})


export default connect(mapStateToProps, mapDispatchToProps)(Issues);
