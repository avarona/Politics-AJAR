import React, {Component} from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router';

// Theme components
import { AppBar, DropDownMenu, MenuItem, FloatingActionButton, FlatButton} from 'material-ui';
import ContentAdd from 'material-ui/svg-icons/content/add';
import { FaMinusCircle } from 'react-icons/lib/fa';
import { Button } from 'react-toolbox/lib/button';

// App components
import Issue from '../components/Issue.jsx';
import { modifyIncludedIssue, modifyScoreAndWeight, addIssue, issueChange, scoreChange, stateChange, hideState, scorePoliticiansChange, getScores } from '../ducks/issues.jsx';
import QuotesComponent from '../components/Quotes.jsx';

let imgUrl = 'http://static2.businessinsider.com/image/577548084321f171088b5334-1190-625/the-story-of-the-only-man-who-signed-the-declaration-of-independence-and-recanted-his-signature.jpg';

const styles = {
  align: {
    textAlign: 'center',
  },
  homepage: {
    backgroundImage: 'url(' + imgUrl + ')',
  	height: 940,
  	backgroundSize: 'cover',
    overflow: 'hidden',
  },
  title: {
  	color: 'white',
  	fontSize: 75,
  	marginTop: 50,
  	fontFamily: 'Lato',
  },
  title2: {
    color: 'white',
    marginTop: 20,
    fontFamily: 'Cormorant',
    fontWeight: 'bold'
  },
  buttonSlider: {
  	marginTop: 150
  },
  blocks: {
  	display: 'block',
  	fontSize: 30,
  	marginTop: 40
  }
}


class Homepage extends Component {
  constructor(props) {
    super(props);
    this.state = {
            // issueValues: {},
            // IssueNumber: 0
    }
    this.handleChange = this.handleChange.bind(this);
    this.handleMenuChange = this.handleMenuChange.bind(this);
    this.handleChangeIssueNumbers =  this.handleChangeIssueNumbers.bind(this);
    this.renderIssues =  this.renderIssues.bind(this);
    this.handleStateChange = this.handleStateChange.bind(this);
  }

  handleChange(index, newValue) {
    this.props.scoreChange(index, newValue)
    const itemValue = this.props.issues.issueValues[index].value
    this.props.changeScore(itemValue, newValue)
  }

  handleMenuChange(index, value) {
    this.props.issueChange(index, value)
    this.props.includeOrNot(value, index)
  }


  handleChangeIssueNumbers() {
  	this.props.addIssue()
    this.props.hideState()
   }

   handleStateChange(value){
    this.props.stateChange(value)
   }

   renderIssues() {
    const {issues, issueValues, issueNumber, states} = this.props.issues;
    let issuesList = [];

    for (let i = 1; i <= issueNumber; i++) {
      issuesList.push(
          <div key={i}>
           <DropDownMenu value={issueValues[i].value} autoWidth={true} onChange={(event, index, value) => this.handleMenuChange(i, value)} maxHeight={300} labelStyle={{color: 'white', fontWeight: 'bold', fontSize: '25px'}}>
           <MenuItem value={1} primaryText="Select Issue" />
             {Object.keys(issues).sort().map((issue, index) =><MenuItem value={issues[issue].id} key={issues[issue].id} primaryText={issue} /> )}
           </DropDownMenu>

           <div  >
           <Issue
             value={issueValues[i].slidebar}
             handleChange={(evt, newValue) => this.handleChange(i, newValue)}
             style={styles.description}
           />
           </div>

           <div>
            <Link to="/politicians" >
                 <FlatButton
                label="SUBMIT"
                backgroundColor="white"
                primary={true}
                />
             </Link>
           </div>

         </div>
       )
      }
    return issuesList;
   }

  render() {
    const {issues, issueValues, issueNumber, states, selectedState, displayState} = this.props.issues;
    return (
      <div>
        <div style={styles.homepage}>
          <div style={styles.align}>
            <AppBar
            title = ""
            style={{backgroundColor: 'white'}}
            iconStyleLeft={{backgroundColor: 'white'}}
            iconElementRight={<Link to="/about"><FlatButton label="About" style={{color:'#000b63', fontSize: 30, fontWeight: 'bold'}} /></Link>}
            />

            	<h1 style={styles.title}> POLITICS AJAR </h1>
              <h2 style={styles.title2} > A gateway into US Politics </h2>
              <div style={styles.buttonSlider} >
                { this.renderIssues() }
              </div>
               <Button icon='bookmark' label='I like hot dogs' accent />

              {( displayState === true) ?
              <div style={styles.block} >
              <DropDownMenu value={selectedState} autoWidth={true} maxHeight={300} labelStyle={{color: 'white', fontWeight: 'bold', fontSize: '25px'}} onChange={(event, index, value) => this.handleStateChange(value)}  >
              <MenuItem value={'AA'} primaryText='Select your state' />
              {Object.keys(states).sort().map( (state) => <MenuItem value={state} primaryText={states[state]} key={state}  /> )}
              </DropDownMenu>
              </div>
              :
              null
              }


              {(issueNumber <= 0 && selectedState !== 'AA') ?
      	        <FloatingActionButton
      	          mini={true}
      	          secondary={true}
      	          onClick={this.handleChangeIssueNumbers}
                  style={styles.block}>
      	          <ContentAdd />
      	        </FloatingActionButton>
                :
                null
              }
            </div>
          </div>
          <div style={styles.blocks} >
           <QuotesComponent />
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
  includeOrNot(issueId, linkId){
    dispatch(modifyIncludedIssue(issueId, linkId))
    dispatch(scorePoliticiansChange())
    dispatch(getScores())
  },
  changeScore(issueId, score){
    dispatch(modifyScoreAndWeight(issueId, score))
    dispatch(getScores())
  },
  addIssue(){
  	dispatch(addIssue())
    dispatch(getScores())
  },
  issueChange(index, value){
  	dispatch(issueChange(index, value))
    dispatch(getScores())
  },
  scoreChange(index, newValue){
  	dispatch(scoreChange(index, newValue))
    dispatch(getScores())
  },
  stateChange(state) {
    dispatch(stateChange(state))
    dispatch(scorePoliticiansChange())
    dispatch(getScores())
  },
  hideState(){
    dispatch(hideState())
  }
})

export default connect(mapStateToProps, mapDispatchToProps)(Homepage);
