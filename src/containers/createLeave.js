import React from 'react';
import {Link} from 'react-router';
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';
import {Card, CardActions, CardHeader, CardText} from 'material-ui/Card';
import AppBar from 'material-ui/AppBar';
import { hashHistory  } from 'react-router';
import { submitLeave } from '../actions/leavesAction.js'
import { connect } from 'react-redux';
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';
import DatePicker from 'material-ui/DatePicker';
import { bindActionCreators } from 'redux';

const style = {
	margin: 12,
};

const pStyle = {
	display: 'flex',
	flexDirection: 'column',
	justifyContent: 'center',
	width: '100%',
	maxWidth: 350,
	margin: 'auto'
}

const fStyle = {
	textAlign: 'center',
}

const fbStyle = {
	display: 'flex',
	alignItems: 'center',
	justifyContent: 'center',
	margin: 'auto'
}

const tStyle = {
	display: 'flex',
	alignItems: 'center',
	justifyContent: 'center',
	margin: 12
}

const bStyle = {
	display: 'flex',
	alignItems: 'center',
	justifyContent: 'center',
	margin: 24
}

class CreateLeave extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      value: 1,
      reason: '',
      start_date: null,
      end_date: null
    };
    this.handleTypeChange = this.handleTypeChange.bind(this);
    this.handleStartChange = this.handleStartChange.bind(this);
    this.handleEndChange = this.handleEndChange.bind(this);
    this.onCreate = this.onCreate.bind(this);
    this.handleReasonChange = this.handleReasonChange.bind(this);
  }

  componentWillMount(){
		if (!this.props.isLoggedIn ) {
			hashHistory.push('/login?path=home');
			return;
		}
    let accessToken = localStorage.getItem('access_token');
    //console.log(accessToken);
	};

  handleTypeChange(event, index, value) {
    this.state.value = value;
		console.log(this.state.value);
  }

  handleStartChange(event, date) {
    this.setState({
      start_date: date,
    });
  }

  handleEndChange(event, date) {
    this.setState({
      end_date: date,
    });
  }

  handleReasonChange(event) {
    let reason = this.state.reason;
    reason = event.target.value;
    this.setState({ reason: reason });
  }

  onCreate() {
		if(this.state.value == 1)
			this.props.submitLeave(this.state, "MEDICAL");
		else if(this.state.value == 2)
			this.props.submitLeave(this.state, "FAMILY");
		else if(this.state.value == 3)
			this.props.submitLeave(this.state, "OTHERS");
		console.log(this.state.value);
    //console.log(this.state);
  }

  render() {
    	return (
	      <div style={{margin:'auto', verticalAlign: 'middle'}}>
					<Card style={pStyle}>
						<h1 style={{textAlign:'center', marginTop: '20px'}}>
	            Create a leave request
						</h1>
						<div style={{paddingLeft: 24, paddingRight: 18}}>
	  					<div className="group">
	  						<TextField autoFocus
	  						ref="reason"
	  						hintText="Reason"
	  						floatingLabelText="Reason"
	  						type="Reason"
	  						onChange={this.handleReasonChange}/>
	  					</div>
              <div style={{paddingLeft: 0, paddingRight: 24}}>
                <SelectField
                  floatingLabelText="Type"
                  value={this.state.value}
                  onChange={(event, key, value) => this.setState({value: value})}>
                  <MenuItem value={1} primaryText="Medical" />
                  <MenuItem value={2} primaryText="Family" />
                  <MenuItem value={3} primaryText="Others" />
                </SelectField>
	  					</div>
              <div>
                <DatePicker hintText="From" value={this.state.start_date}
                onChange={this.handleStartChange} />
              </div>
              <div>
                <DatePicker hintText="To" value={this.state.end_date}
                onChange={this.handleEndChange}/>
              </div>
	  				  <div style={bStyle}>
	  						<RaisedButton onClick={this.onCreate} primary={true} style={style} label="Create" />
	  					</div>
						</div>
					</Card>
				</div>
    	);
  }

}

function mapStateToProps(state, ownProps) {
  return {
    isLoggedIn: state.authState.isLoggedIn
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({
    submitLeave: submitLeave
  }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(CreateLeave);
