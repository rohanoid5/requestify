import React from 'react';
import {Link} from 'react-router';
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';
import { bindActionCreators } from 'redux';
import { logginUser } from '../actions/loginAction';
import {Card, CardActions, CardHeader, CardText} from 'material-ui/Card';
import CircularProgress from '../components/progressbar';
import AppBar from 'material-ui/AppBar';
import { hashHistory  } from 'react-router';
import { hasAccessToken } from '../index.js';
import { connect } from 'react-redux';

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

class Login extends React.Component {
  constructor(props) {
    super(props);
		this.state = {
			user: {
				email: '',
				password: '',
			}
		};
    this.onSignupClick = this.onSignupClick.bind(this);
		this.onLoginClick = this.onLoginClick.bind(this);
  }

	componentWillMount(){
		if(hasAccessToken()){
			hashHistory.push('/home');
		}
	}

  onSignupClick() {
    hashHistory.push('/signup');
  }

	onLoginClick() {
		this.props.logginUser(this.state.user);
	}

	captureMail(e) {
		this.state.user.email = e.target.value;
	};

	capturePassword(e) {
		this.state.user.password = e.target.value;
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
	  						ref="email"
	  						hintText="Email"
	  						floatingLabelText="Email"
	  						type="Email"
								onChange={this.captureMail.bind(this)}
	  						/>
	  					</div>
	  					<div className="group">
	  						<TextField
	  						hintText="Password "
	  						ref="password"
	  						floatingLabelText="Password"
	  						type="password"
								onChange={this.capturePassword.bind(this)}
	  						/>
	  					</div>
	  				  <div style={bStyle}>
	  						<RaisedButton onClick={this.onLoginClick} primary={true} style={style} label="Login" />
	  						<RaisedButton primary={true} onClick={this.onSignupClick} label="Signup" style={style} />
	  					</div>
						</form>
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
		logginUser: logginUser,
	}, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(Login);
