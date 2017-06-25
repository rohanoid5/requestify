import React from 'react';
import {Link} from 'react-router';
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';
import {Card, CardActions, CardHeader, CardText} from 'material-ui/Card';
import AppBar from 'material-ui/AppBar';
import { hashHistory  } from 'react-router';
import { hasAccessToken } from '../index.js';
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';
import CircularProgress from '../components/progressbar';
import { signupUser } from '../actions/loginAction';
import { connect } from 'react-redux';
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

class Signup extends React.Component {
  constructor(props) {
    super(props);
		this.state = {
      value: 1,
			email: '',
			password: '',
			name: '',
			role: 'EMP',
			username: ''
    };
    this.onLoginClick = this.onLoginClick.bind(this);
		this.onSignupClick = this.onSignupClick.bind(this);
		// this.handleRoleChange = this.handleRoleChange.bind(this);
  }

	componentWillMount(){
		if(hasAccessToken()){
			hashHistory.push('/home');
		}
	}

  onLoginClick() {
    hashHistory.push('/login');
  }

	onSignupClick() {
		if(this.state.value == 1)
			this.props.signupUser(this.state, "EMP");
		else if(this.state.value == 2)
			this.props.signupUser(this.state, "MNG");

    //this.props.signupUser(this.state);
  }

	captureMail(e) {
		this.state.email = e.target.value;
	};

	capturePassword(e) {
		this.state.password = e.target.value;
	};

	captureName(e) {
		this.state.name = e.target.value;
	};

	captureUsername(e) {
		this.state.username = e.target.value;
	};

  render() {
		if(!this.props.authState.logging) {
	    return (
	      <div style={{margin:'auto', verticalAlign: 'middle'}}>
					<Card style={pStyle}>
	          <div style={{textAlign:'center', marginTop: '20px'}}>
	            <h1>REQUESTIFY</h1>
	          </div>
						<div style={{textAlign:'center', marginTop: '4px'}}>
	            Request for your Leave in an easy way.
						</div>
						<form style={fStyle}>
	            <div className="group">
	              <TextField autoFocus
	              ref="name"
	              hintText="Name"
	              floatingLabelText="Name"
	              type="Name"
	              onChange={this.captureName.bind(this)}/>
	            </div>
	            <div className="group">
	  						<TextField autoFocus
	  						ref="email"
	  						hintText="Email"
	  						floatingLabelText="Email"
	  						type="Email"
	  						onChange={this.captureMail.bind(this)}/>
	  					</div>
	  					<div className="group">
	  						<TextField autoFocus
	  						ref="username"
	  						hintText="Username"
	  						floatingLabelText="Username"
	  						type="Username"
	  						onChange={this.captureUsername.bind(this)}/>
	  					</div>
	  					<div className="group">
	  						<TextField
	  						hintText="Password "
	  						ref="password"
	  						floatingLabelText="Password"
	  						type="password"
	  						onChange={this.capturePassword.bind(this)}/>
	  					</div>
						</form>
						<div style={{paddingLeft:'48px'}}>
							<SelectField
								floatingLabelText="Type"
								value={this.state.value}
								onChange={(event, key, value) => this.setState({value: value})}>
								<MenuItem value={1} primaryText="Employee" />
								<MenuItem value={2} primaryText="Manager" />
							</SelectField>
						</div>
						<div style={bStyle}>
							<RaisedButton primary={true} onClick={this.onLoginClick} label="Login" style={style} />
							<RaisedButton primary={true} onClick={this.onSignupClick} label="Signup" style={style} />
						</div>
					</Card>
				</div>
	    );
		} else {
			return (
				<CircularProgress color="white"/>
			)
		}
  }
};

function mapStateToProps(state) {
	return {
		authState: state.authState
	};
}

function mapDispatchToProps(dispatch) {
	return bindActionCreators({
		signupUser: signupUser,
	}, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(Signup);
