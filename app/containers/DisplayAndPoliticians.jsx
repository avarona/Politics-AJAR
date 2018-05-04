import React, {Component} from 'react';
import { Link } from 'react-router';
import { connect } from 'react-redux';
import Sidebar from 'react-sidebar';
import { FlatButton, AppBar, DropDownMenu, MenuItem } from 'material-ui';

import Politicians from './Politicians.jsx';
import Issues from './Issues.jsx';
import { stateChange, scorePoliticiansChange, getScores } from '../ducks/issues.jsx';
import { selectPoliticianByState } from '../ducks/reducers.jsx';

const buttonStyle = {
	textAlign: 'center',
	display: 'block',
	// paddingTop: 100
}

const navbarStyle = {
	 root: {
	   position: 'absolute',
	   top: 0,
	   left: 0,
	   right: 0,
	   bottom: 0,
	   overflow: 'hidden',
	 },
	 sidebar: {
	   zIndex: 2,
	   position: 'absolute',
	   top: 0,
	   bottom: 0,
	   right: '80%',
	   transition: 'transform .3s ease-out',
	   WebkitTransition: '-webkit-transform .3s ease-out',
	   willChange: 'transform',
	   overflowY: 'auto',
		 backgroundColor: '#820101',
	 },
	 content: {
	   position: 'absolute',
	   top: 0,
	   left: 0,
	   right: 0,
	   bottom: 0,
	   overflow: 'auto',
	   transition: 'left .3s ease-out, right .3s ease-out',
	 },
	 overlay: {
	   zIndex: 1,
	   position: 'fixed',
	   top: 0,
	   left: 0,
	   right: 0,
	   bottom: 0,
	   opacity: 0,
	   visibility: 'hidden',
	   transition: 'opacity .3s ease-out',
		 backgroundColor: 'rgba(0,0,0,.3)'
	 },
	 dragHandle: {
	   zIndex: 1,
	   position: 'fixed',
	   top: 0,
	   bottom: 0,
	 }
}

class DisplayAndPoliticians extends Component {

	constructor(props){
		super(props);
		this.state = {
			sidebarOpen: false,
			sidebarDocked: true,
			search: '',
			senateSelected: true,
			houseSelected: true,
			senateClickedColor: '#00008b',
			houseClickedColor: '#00008b',
			senateText: {color: 'white'},
			houseText: {color: 'white'}
		}
		this.handleToggle = this.handleToggle.bind(this);
	    this.handleStateChange = this.handleStateChange.bind(this);

	}

	onSetSidebarOpen(open) {
		this.setState({sidebarOpen: open})
	}

	handleToggle(){
		this.setState({sidebarDocked: !this.state.sidebarDocked})
	}

	onClick(filter){
		this.setState({search: filter})
		if (filter === 'senate' && this.state.senateSelected === true){
			this.setState({senateClickedColor: '#ffffff', senateSelected: false, senateText: {color: '#00008b'}})
		}
		if (filter === 'house' && this.state.houseSelected === true) {
			this.setState({ houseClickedColor: '#ffffff', houseSelected: false, houseText: {color: '#00008b'} })
		}
		if (filter === 'senate' && this.state.senateSelected === false){
			this.setState({senateClickedColor: '#00008b', senateSelected: true, senateText: {color: 'white'} })
		}
		if (filter === 'house' && this.state.houseSelected === false) {
			this.setState({houseClickedColor: '#00008b', houseSelected: true, houseText: {color: 'white'} })
		}
	}


   handleStateChange(value){
    this.props.stateChange(value)
   }


	render(){
		let {politicians} = this.props;
		let {selectedState, states} = this.props.issues;
		let politicianIds = Object.keys(this.props.issues.politicianScores);
		// console.log('this.props.issues is', this.props.issues);
		let {senateSelected, houseSelected} = this.state;
		let sidebarContent = (
			<div>
				<div style={{textAlign: 'center'}}>
	        <DropDownMenu value={selectedState} autoWidth={true} maxHeight={250} labelStyle={{color: 'white', fontWeight: 'bold', fontSize: '25px'}} onChange={(event, index, value) => this.handleStateChange(value)}  >
		        <MenuItem value={'AA'} primaryText='Select State' />
		        {Object.keys(states).sort().map( (state) => <MenuItem value={state} primaryText={states[state]} key={state}  /> )}
	        </DropDownMenu>
        </div>
				<div style={buttonStyle}>
					<FlatButton
						label="Senate"
						onClick={() => this.onClick('senate')}
						backgroundColor={this.state.senateClickedColor}
						labelStyle={this.state.senateText}
					/>
					<FlatButton
						label="House"
						onClick={() => this.onClick('house')}
						backgroundColor={this.state.houseClickedColor}
						labelStyle={this.state.houseText}
					/>
				<hr />
					<Issues />
				<hr />
				</div>
			</div>
		)

		if (senateSelected && !houseSelected){
			politicians = politicians.filter(politician => politician.chamber.match('senate'))
		}
		else if (!senateSelected && houseSelected){
			politicians = politicians.filter(politician => politician.chamber.match('house'))
		}
		else if (senateSelected && houseSelected){
			// politicians = politicians;
		}
		else {
			politicians = []
		}
		politicians.forEach(politician => {
			for (let i = 0; i < politicianIds.length; i++){
				if (politician.ppid === politicianIds[i]){
					politician.totalAgreementScore = this.props.issues.politicianScores[politicianIds[i]].totalAgreementScore;
				}
			}
      		return politician;
    	});

		return (
			<div>
				<Sidebar
					sidebar={sidebarContent}
					open={this.state.sidebarOpen}
					onSetOpen={this.onSetSidebarOpen}
					docked={this.state.sidebarDocked}
					styles={navbarStyle}
				>
					<AppBar
						title="Politics AJAR"
						onLeftIconButtonTouchTap={this.handleToggle}
						iconElementRight={
							<Link to="/about">
								<FlatButton
									label="About"
									style={{color: '#C3C3C3 ', fontSize: 30, fontWeight: 'bold'}}
								/>
							</Link>
						}
						style={{backgroundColor: '#000b63'}}
					/>
					<Politicians
						handleToggle={this.handleToggle}
						politicians={politicians}
					/>
				</Sidebar>
			</div>
		)
	}
}


const mapStateToProps = (state) => {

  return {
    politicians: selectPoliticianByState(state),
    issues: state.issues
  }
}

const mapDispatchToProps = (dispatch) => ({
	  stateChange(state) {
			dispatch(stateChange(state))
			dispatch(scorePoliticiansChange())
			dispatch(getScores())
		}
})


export default connect(mapStateToProps, mapDispatchToProps)(DisplayAndPoliticians)
